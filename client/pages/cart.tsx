import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Cart from '../components/cart/Cart'
import Loading from '../components/UI/Loading'

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

const CartPage = () => {

  const { loading, error } = useQuery(CURRENT_USER_QUERY)
  
  const router = useRouter()

  if (loading) return <Loading/>
  if (error) router.push('/')

  return (
    <Cart/>
  )
}

export default CartPage