import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
  let tokenLC = null;
  if (typeof window !== "undefined") tokenLC = localStorage.getItem("token");

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(tokenLC)
  }, [])

  const isSignedIn = () => token ? true : false

  const getAuthHeaders = () => token ? { authorization: `Bearer ${token}` } : null

  const createApolloClient = () => {
    return new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:3001/graphql', headers: getAuthHeaders() }),
      cache: new InMemoryCache()
    })
  }

  const signIn = async ({ email, password }) => {
    const client = createApolloClient()

    const LOGIN_MUTATION = gql`
      mutation login($email: String!, $password: String!) {
        login(credentials: { email: $email, password: $password })
      }
    `

    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    })

    if (result?.data?.login) {
      setToken(result.data.login)
      localStorage.setItem('token', result.data.login)
    }
  }

  const signUp = async ({ email, password }) => {
    const client = createApolloClient()

    const REGISTER_MUTATION = gql`
      mutation register($email: String!, $password: String!) {
        register(credentials: { email: $email, password: $password })
      }
    `

    const result = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { email, password }
    })

    if (result?.data?.register) {
      setToken(result.data.register)
      localStorage.setItem('token', result.data.register)
    }
  }

  const signOut = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return { setToken, isSignedIn, createApolloClient, signIn, signUp, signOut }
}