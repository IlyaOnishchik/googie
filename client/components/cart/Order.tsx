import React from 'react'
import { v4 } from 'uuid'
import { Product } from '../../types/Product'

type OrderProps = {
  products: Product[]
}

const Order: React.FC<OrderProps> = ({ products }) => {

  const totalPrice = products.reduce((totalPrice, product) => totalPrice + product.price, 0)

  return (
    <div className='self-start | flex flex-col | gap-3 p-5 | rounded-xl | bg-gray-100'>
      <div className='self-center | text-xl font-semibold'>Order</div>
      <div>
        {products.map(product => <div key={v4()}>- {product.price} $</div>)}
      </div>
      <div className='self-center text-lg'>Total: {totalPrice} $</div>
      <button className='px-5 py-2 | border border-red-600 hover:border-white rounded | transition-all text-red-600 hover:text-white hover:bg-red-600'>Checkout</button>
    </div>
  )
}

export default Order