import { gql, useQuery } from '@apollo/client'
import { useDisclosure } from '@chakra-ui/react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Order } from '../../enums/Order'
import { useAppSelector } from '../../redux/hooks'
import Error from '../UI/Error'
import Loading from '../UI/Loading'
import Pagination from '../UI/Pagination'
import Filters from './Filters'
import FiltersModal from './FiltersModal'
// import Pagination from './Pagination'
import Products from './Products'
import Sorting from './Sorting'

const SUBCATEGORY_QUERY = gql`
  query subcategory($id: String!) {
    subcategory(id: $id) {
      name
    }
  }
`

const PRODUCTS_QUERY = gql`
  query products($subcategoryId: String!, $limit: Int!, $offset: Int!, $sortBy: String!, $order: String!, $filters: [String!], $values: [String!]) {
    products(subcategoryId: $subcategoryId, limit: $limit, offset: $offset, sortBy: $sortBy, order: $order, filters: $filters, values: $values) {
      id
      name
      price
      imageName
    }
  }
`

const PRODUCTS_COUNT_QUERY = gql`
  query productsCount($subcategoryId: String!, $filters: [String!], $values: [String!]) {
    productsCount(subcategoryId: $subcategoryId, filters: $filters, values: $values)
  }
`

const Subcategory = () => {

  const router = useRouter()
  const { id: subcategoryId } = router.query

  const { data: subcategoryData } = useQuery(SUBCATEGORY_QUERY, { variables: { id: subcategoryId } })

  const [limit, setLimit] = useState(9)
  const [page, setPage] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [order, setOrder] = useState<Order>(Order.ASC)

  const filters = useAppSelector(state => state.filtration.filters)
  const names = [...new Set(filters.map(filter => filter.name))]
  const values = filters.map(filter => filter.value)

  const { loading, error, data } = useQuery(PRODUCTS_QUERY, { variables: { subcategoryId, limit, offset: page * limit, sortBy, order, filters: names, values } })

  const { data: countData } = useQuery(PRODUCTS_COUNT_QUERY, { variables: { subcategoryId, filters: names, values } })

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  return (
    <section className='py-5'>
      <div className='container | flex flex-col | gap-7'>
        {subcategoryData && <h1 className='text-3xl font-semibold'>{subcategoryData.subcategory.name}</h1>}
        <div className='flex | gap-7'>
          <div className='flex-auto'>
            <div className='flex justify-between items-center'>
              <Sorting sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
              <button className='block md:hidden | p-2 | shadow hover:shadow-inner transition-all' onClick={onOpen}>
                <FunnelIcon className='block w-6 h-6'/>
                <FiltersModal isOpen={isOpen} onClose={onClose}/>
              </button>
            </div>
            <Products products={data.products}/>
            {countData && countData.productsCount > limit && <Pagination page={page} setPage={setPage} count={countData.productsCount} limit={limit}/>}
          </div>
          <aside className='hidden md:block w-[250px]'>
            <Filters/>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Subcategory