'use client'

import React from 'react'
import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

const STORAGE_KEY = 'accessToken'
const accessToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) || '' : ''

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4001/graphql',
    headers: {
      Authorization: accessToken,
    },
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
