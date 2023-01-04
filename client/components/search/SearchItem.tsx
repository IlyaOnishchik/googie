import Link from 'next/link'
import React from 'react'
import { Product } from '../../types/Product'
import { Image } from '@chakra-ui/react'
import { ShoppingCartIcon as ShoppingCartIconOutline } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid'
import { useCart } from '../../hooks/useCart'
import Loading from '../UI/Loading'
import Error from '../UI/Error'

type SearchItemProps = {
  product: Product
}

const SearchItem: React.FC<SearchItemProps> = ({ product }) => {

  const { loading, error, data, toggle } = useCart()
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const cart = data.currentUser.cart
  const products = cart.products
  const isAdded = !!products.find((item: Product) => item.id === product.id)

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    toggle(isAdded, cart.id, product.id)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className='flex items-center | p-5 | rounded-xl | transition-all cursor-pointer bg-gray-100 hover:shadow-md'>
        <div className='p-3 | rounded-xl | bg-white'>
          <Image className='self-center' src={`http://localhost:3001/${product.imageName}`} objectFit='contain' boxSize='100px'/>
        </div>
        <div className='flex-auto | px-5 | text-2xl font-semibold'>{product.name}</div>
        <div className='flex flex-col items-center | gap-2'>
          <span className='text-xl font-semibold'>{product.price} $</span>
          <button className='p-2 | transition-all rounded-3xl hover:shadow-inner' onClick={handleToggle}>
            {isAdded
              ? <ShoppingCartIconSolid className='block w-6 h-6 text-red-600'/>
              : <ShoppingCartIconOutline className='block w-6 h-6 text-red-600'/>
            }
          </button>
        </div>
      </div>
    </Link>

  )
}

export default SearchItem