import { gql, useMutation } from "@apollo/client"

const CREATE_PRODUCT_PARAMETER_MUTATION = gql`
  mutation createProductParameter($productId: String!, $parameterId: String!, $value: String!) {
    createProductParameter(createProductParameterInput: { productId: $productId, parameterId: $parameterId, value: $value }) {
      id
    }
  }
`

export const useProductParameter = () => {

  const [createProductParameter, {}] = useMutation(CREATE_PRODUCT_PARAMETER_MUTATION)

  const create = (productId: string, parameterId: string, value: string) => {
    createProductParameter({ variables: { productId, parameterId, value } })
  }

  return {
    create
  }
}