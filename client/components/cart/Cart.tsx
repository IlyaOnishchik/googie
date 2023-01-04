import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import { Product } from '../../types/Product'
import CartItem from './CartItem'
import { v4 } from 'uuid'
import Order from './Order'

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

const Cart = () => {
  
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)

  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const cart = data.currentUser.cart
  const products = cart.products

  return (
    <section>
      <div className='container'>
        <div className='flex | gap-10 py-5'>
          <div className='flex-auto | flex flex-col | gap-5'>
            {products.map((product: Product) => <CartItem key={v4()} product={product} cartId={cart.id}/>)}
          </div>
          <Order products={products}/>
        </div>
      </div>
    </section>
  )
}

export default Cart