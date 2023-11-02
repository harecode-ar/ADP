'use client'

import React from 'react'
import { HttpLink, DefaultOptions } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { NEXT_PUBLIC_APP_URL } from 'src/config-global'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${NEXT_PUBLIC_APP_URL}/graphql`,
  })

  const authLink = setContext((_, { headers }) => {
    const accessToken = localStorage.getItem('accessToken')
    return {
      headers: {
        ...headers,
        authorization: accessToken || '',
      },
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
