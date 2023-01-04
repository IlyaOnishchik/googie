import { TabPanel } from '@chakra-ui/react'
import React from 'react'
// import { useProducts } from '../../../../hooks/useProducts'
import Loading from '../../../UI/Loading'
import Error from '../../../UI/Error'
import Actions from './Actions'
import Table from './Table'
import Pagination from '../../../UI/Pagination'
import { gql, useQuery } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setPage } from '../../../../redux/slices/adminProductsSlice'

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

const Products = () => {

  const dispatch = useAppDispatch()

  const { subcategoryId, limit, page, sortBy, order } = useAppSelector(state => state.adminProducts)

  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(PRODUCTS_QUERY, { variables: { subcategoryId, limit, offset: page * limit, sortBy, order } })
  const { loading: countLoading, error: countError, data: countData } = useQuery(PRODUCTS_COUNT_QUERY, { variables: { subcategoryId } })

  if (productsLoading) return <Loading/>
  if (productsError) return <Error error={productsError}/>

  const products = productsData.products

  return (
    <TabPanel>
      <div className='flex flex-col gap-5'>
        <Actions/>
        <Table products={products}/>
        {
          countLoading ? <Loading/>
          : countError ? <Error error={countError}/>
          : countData.productsCount <= limit ? null
          : <Pagination count={countData.productsCount} limit={limit} page={page} setPage={setPage} dispatch={dispatch}/>
        }
      </div>
    </TabPanel>
  )
}

export default Products