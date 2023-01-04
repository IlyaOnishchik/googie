import { gql, useMutation, useQuery } from "@apollo/client"

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      email
      cart {
        id
        products {
          id
          name
          price
          imageName
        }
      }
    }
  }
`
const ADD_PRODUCT_TO_CART_MUTATION = gql`
  mutation addProductToCart($cartId: String!, $productId: String!) {
    addProductToCart(addProductInput: { cartId: $cartId, productId: $productId }) {
      id
    }
  }
`
const REMOVE_PRODUCT_FROM_CART_MUTATION = gql`
  mutation removeProductFromCart($cartId: String!, $productId: String!) {
    removeProductFromCart(removeProductInput: { cartId: $cartId, productId: $productId }) {
      id
    }
  }
`

export const useCart = () => {
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] })
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] })

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)

  const add = (cartId: string, productId: string) => addProductToCart({ variables: { cartId, productId } })
  const remove = (cartId: string, productId: string) => removeProductFromCart({ variables: { cartId, productId } })
  const toggle = (isAdded: boolean, cartId: string, productId: string) => {
    isAdded
      ? removeProductFromCart({ variables: { cartId, productId } })
      : addProductToCart({ variables: { cartId, productId } })
  }

  return {
    loading,
    error,
    data,
    add,
    remove,
    toggle
  }
}