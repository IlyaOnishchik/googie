import { gql, useMutation } from "@apollo/client"
import { useAppSelector } from "../../redux/hooks"

const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($id: String!, $name: String, $price: Int, $imageName: String) {
    updateProduct(updateProductInput: { id: $id, name: $name, price: $price, imageName: $imageName })
  }
`
const PRODUCTS_QUERY = gql`
  query products($subcategoryId: String, $limit: Int, $offset: Int, $sortBy: String, $order: String, $filters: [String!], $values: [String!]) {
    products(subcategoryId: $subcategoryId, limit: $limit, offset: $offset, sortBy: $sortBy, order: $order, filters: $filters, values: $values) {
      id
      name
      price
      imageName
    }
  }
`

export const useUpdateProduct = () => {
  const { subcategoryId: subcategoryIdToFind, limit, page, sortBy, order } = useAppSelector(state => state.adminProducts)

  const [updateProduct, { loading, error, data }] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [
      { query: PRODUCTS_QUERY, variables: { subcategoryId: subcategoryIdToFind, limit, offset: page * limit, sortBy, order } }
    ],
  })

  const update = (id: string, name?: string, price?: number, imageName?: string) => { 
    updateProduct({ variables: { id, name, price, imageName} }) 
  }

  return { update, loading, error, data }
}