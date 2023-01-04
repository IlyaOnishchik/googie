import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import SearchItem from './SearchItem'
import { Product } from '../../types/Product'

const PRODUCTS_QUERY = gql`
  query products($limit: Int!, $offset: Int!, $query: String!) {
    products(limit: $limit, offset: $offset, query: $query) {
      id
      name
      price
      imageName
    }
  }
`

const Search = () => {

  const router = useRouter()
  const { query } = router.query

  const { loading, error, data } = useQuery(PRODUCTS_QUERY, { variables: { limit: 10, offset: 0, query } })
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  return (
    <section>
      <div className='container | py-5'>
        <div className='flex flex-col | gap-5'>
          {data.products.map((product: Product) => <SearchItem product={product}/>)}
        </div>
      </div>
    </section>
  )
}

export default Search