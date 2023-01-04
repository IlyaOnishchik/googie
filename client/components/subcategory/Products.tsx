import React from 'react'
import { Product } from '../../types/Product'
import ProductsItem from './ProductsItem'

type ProductsProps = {
  products: Product[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 | gap-6'>
      {products.map(product => <ProductsItem key={product.id} product={product}/>)}
    </div>
  )
}

export default Products