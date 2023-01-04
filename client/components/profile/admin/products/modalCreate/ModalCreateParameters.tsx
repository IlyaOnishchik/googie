import { gql, useQuery } from '@apollo/client'
import { Button, Select } from '@chakra-ui/react'
import React from 'react'
import Loading from '../../../../UI/Loading'
import Error from '../../../../UI/Error'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { addParameter, changeParameter } from '../../../../../redux/slices/productCreationSlice'
import ModalCreateParametersItem from './ModalCreateParametersItem'

const PARAMETERS_QUERY = gql`
  query parameters {
    parameters {
      id
      name
    }
  }
`

const ModalCreateParameters = () => {

  const dispatch = useAppDispatch()
  const { parameters: parametersToCreate } = useAppSelector(state => state.productCreation)

  const { loading, error, data } = useQuery(PARAMETERS_QUERY)
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>
  const parameters = data.parameters

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeParameter(e.target.value ? { name: e.target.value, value: '' } : null))
  }
  const handleAdd = () => dispatch(addParameter())

  return (
    <div>
      <div className='flex | gap-3'>
        <Select placeholder='Parameter' onChange={handleChange}>
          {parameters.map((item: { id: string, name: string }) => <option key={item.id}>{item.name}</option>)}
        </Select>
        <Button variant='outline' colorScheme='green' onClick={handleAdd}>Add</Button>
      </div>
      <div className='flex flex-col | py-5 gap-3'>
        {parametersToCreate.map(item => <ModalCreateParametersItem parameter={item}/>)}
      </div>
    </div>
    
  )
}

export default ModalCreateParameters