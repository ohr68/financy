import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo-client";

export function App() {
  return (
    <div className="min-h-dvh bg-gray-100">
      <ApolloProvider client={apolloClient}>
        <Toaster />
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  )
}