// @ts-check

import { ApolloLink } from '@apollo/client/link/core/ApolloLink.js'
import { createSignalIfSupported } from '@apollo/client/link/http/createSignalIfSupported.js'
import { parseAndCheckHttpResponse } from '@apollo/client/link/http/parseAndCheckHttpResponse.js'
import { rewriteURIForGET } from '@apollo/client/link/http/rewriteURIForGET.js'
import {
  defaultPrinter,
  fallbackHttpConfig,
  selectHttpOptionsAndBodyInternal,
} from '@apollo/client/link/http/selectHttpOptionsAndBody.js'
import { selectURI } from '@apollo/client/link/http/selectURI.js'
import { serializeFetchParameter } from '@apollo/client/link/http/serializeFetchParameter.js'
import { Observable } from '@apollo/client/utilities/observables/Observable.js'
import { formDataAppendFile } from './form-data-append-file'
import { extractFiles, isExtractableFile } from '../extract-files'

export function createUploadLink({
  uri: fetchUri = '/graphql',
  // @ts-ignore
  useGETForQueries,
  isExtractableFile: customIsExtractableFile = isExtractableFile,
  // @ts-ignore
  FormData: CustomFormData,
  formDataAppendFile: customFormDataAppendFile = formDataAppendFile,
  print = defaultPrinter,
  // @ts-ignore
  fetch: customFetch,
  // @ts-ignore
  fetchOptions,
  // @ts-ignore
  credentials,
  // @ts-ignore
  headers,
  // @ts-ignore
  includeExtensions,
} = {}) {
  const linkConfig = {
    http: { includeExtensions },
    options: fetchOptions,
    credentials,
    headers,
  }

  return new ApolloLink((operation) => {
    const context =
      /**
       * @type {import("@apollo/client/core/types.js").DefaultContext & {
       *   clientAwareness?: {
       *     name?: string,
       *     version?: string,
       *   },
       * }}
       */
      operation.getContext()
    const {
      // @ts-ignore
      clientAwareness: { name, version } = {},
      // eslint-disable-next-line
      headers,
    } = context

    const contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: {
        // Client awareness headers can be overridden by context `headers`.
        ...(name && { 'apollographql-client-name': name }),
        ...(version && { 'apollographql-client-version': version }),
        ...headers,
      },
    }

    const { options, body } = selectHttpOptionsAndBodyInternal(
      operation,
      print,
      fallbackHttpConfig,
      linkConfig,
      contextConfig
    )

    const { clone, files } = extractFiles(body, customIsExtractableFile, '')

    let uri = selectURI(operation, fetchUri)

    if (files.size) {
      if (options.headers)
        // Automatically set by `fetch` when the `body` is a `FormData` instance.
        delete options.headers['content-type']

      // GraphQL multipart request spec:
      // https://github.com/jaydenseric/graphql-multipart-request-spec

      const RuntimeFormData = CustomFormData || FormData

      const form = new RuntimeFormData()

      form.append('operations', serializeFetchParameter(clone, 'Payload'))

      /** @type {{ [key: string]: Array<string> }} */
      const map = {}

      let i = 0
      files.forEach((paths) => {
        /* @ts-ignore */ /* eslint-disable-next-line */
        map[++i] = paths
      })
      form.append('map', JSON.stringify(map))

      i = 0
      files.forEach((_paths, file) => {
        // eslint-disable-next-line
        customFormDataAppendFile(form, String(++i), file)
      })

      options.body = form
    } else {
      if (
        useGETForQueries &&
        // If the operation contains some mutations GET shouldn’t be used.
        !operation.query.definitions.some(
          (definition) =>
            definition.kind === 'OperationDefinition' && definition.operation === 'mutation'
        )
      )
        options.method = 'GET'

      if (options.method === 'GET') {
        const { newURI, parseError } = rewriteURIForGET(uri, body)
        if (parseError)
          // Apollo’s `HttpLink` uses `fromError` for this, but it’s not
          // exported from `@apollo/client/link/http`.
          return new Observable((observer) => {
            observer.error(parseError)
          })
        uri = newURI
      } else options.body = serializeFetchParameter(clone, 'Payload')
    }

    const { controller } = createSignalIfSupported()

    if (typeof controller !== 'boolean') {
      if (options.signal)
        // Respect the user configured abort controller signal.
        // eslint-disable-next-line
        options.signal.aborted
          ? // Signal already aborted, so immediately abort.
            controller.abort()
          : // Signal not already aborted, so setup a listener to abort when it
            // does.
            options.signal.addEventListener(
              'abort',
              () => {
                controller.abort()
              },
              {
                // Prevent a memory leak if the user configured abort controller
                // is long lasting, or controls multiple things.
                once: true,
              }
            )

      options.signal = controller.signal
    }

    const runtimeFetch = customFetch || fetch

    return new Observable((observer) => {
      /**
       * Is the observable being cleaned up.
       * @type {boolean}
       */
      // @ts-ignore
      let cleaningUp

      runtimeFetch(uri, options)
        // @ts-ignore
        .then((response) => {
          // Forward the response on the context.
          operation.setContext({ response })
          return response
        })
        .then(parseAndCheckHttpResponse(operation))
        // @ts-ignore
        .then((result) => {
          observer.next(result)
          observer.complete()
        })
        // @ts-ignore
        .catch((error) => {
          // If the observable is being cleaned up, there is no need to call
          // next or error because there are no more subscribers. An error after
          // cleanup begins is likely from the cleanup function aborting the
          // fetch.
          // @ts-ignore
          if (!cleaningUp) {
            // For errors such as an invalid fetch URI there will be no GraphQL
            // result with errors or data to forward.
            if (error.result && error.result.errors && error.result.data)
              observer.next(error.result)

            observer.error(error)
          }
        })

      // Cleanup function.
      return () => {
        cleaningUp = true

        // Abort fetch. It’s ok to signal an abort even when not fetching.
        if (typeof controller !== 'boolean') controller.abort()
      }
    })
  })
}

/**
 * Checks if a value is an extractable file.
 * @template [ExtractableFile=any] Extractable file.
 * @callback ExtractableFileMatcher
 * @param {unknown} value Value to check.
 * @returns {value is ExtractableFile} Is the value an extractable file.
 * @example
 * How to check for the default exactable files, as well as a custom type of
 * file:
 *
 * ```js
 * import isExtractableFile from "apollo-upload-client/isExtractableFile.mjs";
 *
 * const isExtractableFileEnhanced = (value) =>
 *   isExtractableFile(value) ||
 *   (typeof CustomFile !== "undefined" && value instanceof CustomFile);
 * ```
 */

/**
 * Appends a file extracted from the GraphQL operation to the
 * [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 * instance used as the
 * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
 * `options.body` for the
 * [GraphQL multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec).
 * @template [ExtractableFile=any] Extractable file.
 * @callback FormDataFileAppender
 * @param {FormData} formData
 *   [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 *   instance to append the specified file to.
 * @param {string} fieldName Form data field name to append the file with.
 * @param {ExtractableFile} file File to append. The file type depends on what
 *   the extractable file matcher extracts.
 */
