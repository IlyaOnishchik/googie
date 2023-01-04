import { gql, useMutation } from "@apollo/client"
import { useAppSelector } from "../../redux/hooks"

const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
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
const PRODUCTS_COUNT_QUERY = gql`
  query productsCount($subcategoryId: String, $filters: [String!], $values: [String!]) {
    productsCount(subcategoryId: $subcategoryId, filters: $filters, values: $values)
  }
`

export const useDeleteProduct = () => {

  const { subcategoryId: subcategoryIdToFind, limit, page, sortBy, order } = useAppSelector(state => state.adminProducts)

  const [deleteProduct, { loading, error, data }] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [
      { query: PRODUCTS_QUERY, variables: { subcategoryId: subcategoryIdToFind, limit, offset: page * limit, sortBy, order } },
      { query: PRODUCTS_COUNT_QUERY, variables: { subcategoryIdToFind } }
    ]
  })

  const remove = (id: string) => { deleteProduct({ variables: { id } }) }

  return { remove, loading, error, data }
}