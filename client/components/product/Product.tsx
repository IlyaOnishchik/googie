import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import { Image } from '@chakra-ui/react'
import Order from './Order'
import Parameters from './Parameters'
import { Product } from '../../types/Product'

const PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      price
      imageName
      parameters {
        parameter {
          name
        }
        value
      }
    }
  }
`

const Product = () => {

  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(PRODUCT_QUERY, { variables: { id } })
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const product: Product = data.product

  return (
    <section>
      <div className='container'>
        <h1 className='text-center py-3 text-3xl font-semibold'>{product.name}</h1>
        <div className='flex flex-col md:flex-row md:items-start | gap-3 py-3'>
          <div className='flex flex-col'>
            <Image className='self-center' src={`http://localhost:3001/${product.imageName}`} objectFit={'contain'} boxSize='400px'/>
            <Order product={product}/>
          </div>
          <Parameters/>
        </div>
      </div>
    </section>
  )
}

export default Product