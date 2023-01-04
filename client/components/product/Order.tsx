import React from 'react'
import { useCart } from '../../hooks/useCart'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import { Product } from '../../types/Product'

type OrderProps = {
  product: Product
}

const Order: React.FC<OrderProps> = ({ product }) => {

  const { loading, error, data, toggle } = useCart()
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const cart = data.currentUser.cart
  const products = cart.products
  const isAdded = !!products.find((item: Product) => item.id === product.id)

  const handleToggle = () => toggle(isAdded, cart.id, product.id)

  return (
    <div className='flex flex-col gap-3 p-5'>
      <span className='self-center | text-2xl font-bold'>{product.price} $</span>
      <button className='px-5 py-2 | border border-red-600 hover:border-white rounded | transition-all text-red-600 hover:text-white hover:bg-red-600'>Checkout</button>
      <button
        className='px-5 py-2 | rounded | transition-all bg-red-600 text-white hover:opacity-70'
        onClick={handleToggle}
      >
        {isAdded ? 'Remove from cart' : 'Add to cart'}
      </button>
    </div>
  )
}

export default Order