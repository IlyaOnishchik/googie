import { gql, useMutation } from "@apollo/client"
import { useAppSelector } from "../../redux/hooks"

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($subcategoryId: String!, $name: String!, $price: Int!, $imageName: String!, $parameters: [ParameterToCreate!]) {
    createProduct(createProductInput: { subcategoryId: $subcategoryId, name: $name, price: $price, imageName: $imageName, parameters: $parameters }) {
      id
    }
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

export const useCreateProduct = () => {

  const { subcategoryId: subcategoryIdToFind, limit, page, sortBy, order } = useAppSelector(state => state.adminProducts)

  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [
      { query: PRODUCTS_QUERY, variables: { subcategoryId: subcategoryIdToFind, limit, offset: page * limit, sortBy, order } },
      { query: PRODUCTS_COUNT_QUERY, variables: { subcategoryIdToFind } }
    ],
  })
  
  const create = (subcategoryId: string, name: string, price: number, imageName: string, parameters: { name: string, value: string }[]) => {
    createProduct({ variables: { subcategoryId, name, price, imageName, parameters } })
  }

  return { create, loading, error, data }
}