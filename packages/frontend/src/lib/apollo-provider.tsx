'use client'

import React from 'react'
import { HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { NEXT_PUBLIC_APP_URL } from 'src/config-global'

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
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
