import { gql, useQuery } from '@apollo/client'
import { Input, Select } from '@chakra-ui/react'
import React from 'react'
import Loading from '../../../../UI/Loading'
import Error from '../../../../UI/Error'

const SUBCATEGORIES_QUERY = gql`
  query subcategories {
    subcategories {
      id
      name
    }
  }
`
const PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      price
      imageName
      subcategory {
        id
        name
      }
    }
  }
`

type ModalEditMainProps = {
  productId: string
}

const ModalEditMain: React.FC<ModalEditMainProps> = ({ productId }) => {

  const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCT_QUERY, { variables: { id: productId } })
  const { loading: subcategoriesLoading, error: subcategoriesError, data: subcategoriesData } = useQuery(SUBCATEGORIES_QUERY)

  if (productLoading || subcategoriesLoading) return <Loading/>
  if (productError) return <Error error={productError}/>
  if (subcategoriesError) return <Error error={subcategoriesError}/>

  const product = productData.product
  const subcategories = subcategoriesData.subcategories

  console.log(product)

  return (
    <div className='flex flex-col | gap-3'>
    <Select value={product.subcategory.id} placeholder='Subcategory'>
      {subcategories.map((item: { id: string, name: string }) => <option value={item.id}>{item.name}</option>)}
    </Select>
    <Input placeholder='Name' value={product.name}/>
    <Input placeholder='Price' type='number' value={product.price}/>
    <Input type='file'/>
  </div>
  )
}

export default ModalEditMain