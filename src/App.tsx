import { ApolloProvider } from "@apollo/client"
import { BrowserRouter as RouterProvider } from "react-router-dom"

import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Video } from "./components/Video"

import { apolloClient } from "./lib/apollo"
import { Router } from "./routes"

export function App() {
  return (
    <RouterProvider>
      <ApolloProvider client={ apolloClient }>
        <Router />
      </ApolloProvider>
    </RouterProvider>
  )
}
