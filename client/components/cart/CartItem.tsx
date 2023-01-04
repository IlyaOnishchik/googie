import React from 'react'
import Link from 'next/link'
import { Image } from '@chakra-ui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Product } from '../../types/Product'
import { useCart } from '../../hooks/useCart'
import Loading from '../UI/Loading'
import Error from '../UI/Error'

type CartItemProps = {
  product: Product
  cartId: string
}

const CartItem: React.FC<CartItemProps> = ({ product, cartId }) => {
  
  const { loading, error, remove } = useCart()
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    remove(cartId, product.id)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className='flex items-center | gap-5 p-5 | rounded-xl | transition-all cursor-pointer bg-gray-100 hover:shadow-md'>
        <div className='p-3 | rounded-xl | bg-white'>
          <Image className='self-center' src={`http://localhost:3001/${product.imageName}`} objectFit='contain' boxSize='100px'/>
        </div>
        <div className='flex-auto | flex flex-col |  | text-2xl font-semibold'>
          <span>{product.name}</span>
          <span className='text-xl font-semibold'>{product.price} $</span>
        </div>
        <button 
          className='p-2 | transition-all rounded-3xl hover:shadow-inner'
          onClick={handleRemove}
        >
          <XCircleIcon className='block w-6 h-6 text-red-600'/>
        </button>
      </div>
    </Link>
  )
}

export default CartItem