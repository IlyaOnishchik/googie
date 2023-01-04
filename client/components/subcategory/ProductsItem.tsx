import { gql, useMutation, useQuery } from '@apollo/client'
import { Image } from '@chakra-ui/react'
import { ShoppingCartIcon as ShoppingCartIconOutline } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { Product } from '../../types/Product'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import { useCart } from '../../hooks/useCart'

type ProductsItemProps = {
  product: Product
}

const ProductsItem: React.FC<ProductsItemProps> = ({ product }) => {
 
  const { loading, error, data, toggle } = useCart()
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const cart = data.currentUser.cart
  const products = cart.products
  const isAdded = !!products.find((item: Product) => item.id === product.id)

  const handleToggle = () => toggle(isAdded, cart.id, product.id)

  return (
    <div className='flex flex-col | p-5 | transition-all rounded-xl hover:shadow-lg'>
      <Link href={`/products/${product.id}`}>
        <Image src={`http://localhost:3001/${product.imageName}`} objectFit='contain' boxSize='300px' className='self-center | mb-5 | cursor-pointer'/>
      </Link>
      <div className='text-lg font-semibold'>{product.name}</div>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-bold'>{product.price}$</div>
        <button 
          className={'p-2 | transition-all rounded-3xl hover:shadow-inner'}
          onClick={handleToggle}
        >
          {isAdded
            ? <ShoppingCartIconSolid className='block w-6 h-6 text-red-600'/>
            : <ShoppingCartIconOutline className='block w-6 h-6 text-red-600'/>
          }
        </button>
      </div>
    </div>
  )
}

export default ProductsItem