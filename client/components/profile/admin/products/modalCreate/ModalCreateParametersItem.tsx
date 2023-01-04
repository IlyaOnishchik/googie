import { Button, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch } from '../../../../../redux/hooks'
import { changeParameterValue, removeParameter } from '../../../../../redux/slices/productCreationSlice'

type ModalCreateParametersItemProps = {
  parameter: { name: string, value: string }
}

const ModalCreateParametersItem: React.FC<ModalCreateParametersItemProps> = ({ parameter }) => {

  const dispatch = useAppDispatch()

  const handleRemove = () => dispatch(removeParameter(parameter))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeParameterValue({ name: parameter.name, value: e.target.value }))

  return (
    <div className='flex items-center | gap-3'>
      <Input value={parameter.value} placeholder={parameter.name} onChange={handleChange}/>
      <Button colorScheme='red' onClick={handleRemove}>x</Button>
    </div>
  )
}

export default ModalCreateParametersItem