import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "../redux/hooks"

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($subcategoryId: String!, $name: String!, $price: Int!, $imageName: String!) {
    createProduct(createProductInput: { subcategoryId: $subcategoryId, name: $name, price: $price, imageName: $imageName }) {
      id
    }
  }
`
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

export const useProduct = () => {

  const { subcategoryId: subcategoryIdToFind, limit, page, sortBy, order } = useAppSelector(state => state.adminProducts)

  const [createProduct, { loading: loadingCreate, error: errorCreate, data: dataCreate }] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [
      { query: PRODUCTS_QUERY, variables: { subcategoryId: subcategoryIdToFind, limit, offset: page * limit, sortBy, order } },
      { query: PRODUCTS_COUNT_QUERY, variables: { subcategoryIdToFind } }
    ],
  })
  const [deleteProduct, { loading: loadingDelete, error: errorDelete, data: dataDelete }] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [
      { query: PRODUCTS_QUERY, variables: { subcategoryId: subcategoryIdToFind, limit, offset: page * limit, sortBy, order } },
      { query: PRODUCTS_COUNT_QUERY, variables: { subcategoryIdToFind } }
    ]
  })

  const create = (subcategoryId: string, name: string, price: number, imageName: string) => {
    createProduct({ variables: { subcategoryId, name, price, imageName } })
  }
  const remove = (id: string) => {
    deleteProduct({ variables: { id } })
  }

  return {
    create, loadingCreate, errorCreate, dataCreate,
    remove, loadingDelete, errorDelete, dataDelete,
  }
}