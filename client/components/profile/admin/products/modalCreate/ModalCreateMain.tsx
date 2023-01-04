import { gql, useQuery } from '@apollo/client'
import { Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { setImage, setName, setPrice, setSubcategoryId } from '../../../../../redux/slices/productCreationSlice'
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

const ModalCreateMain = () => {

  const { subcategoryId, name, price } = useAppSelector(state => state.productCreation)
  const dispatch = useAppDispatch()

  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY)
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>
  const subcategories = data.subcategories

  return (
    <div className='flex flex-col | gap-3'>
      <Select value={subcategoryId} onChange={(e) => dispatch(setSubcategoryId(e.target.value))} placeholder='Subcategory'>
        {subcategories.map((item: { id: string, name: string }) => <option value={item.id}>{item.name}</option>)}
      </Select>
      <Input placeholder='Name' value={name} onChange={(e) => dispatch(setName(e.target.value))}/>
      <Input placeholder='Price' type='number' value={price} onChange={(e) => dispatch(setPrice(parseInt(e.target.value)))}/>
      <Input type='file' onChange={(e) => dispatch(setImage(e.target.files[0]))}/>
    </div>
  )
}

export default ModalCreateMain