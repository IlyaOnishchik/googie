import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setLimit, setOrder, setSortBy } from '../../../../redux/slices/adminProductsSlice'
import LimitSelect from '../../../UI/LimitSelect'
import OrderSelect from '../../../UI/OrderSelect'
import SortBySelect from '../../../UI/SortBySelect'
import ModalCreate from './modalCreate/ModalCreate'

const Actions = () => {

  const { isOpen, onOpen, onClose} = useDisclosure()

  const dispatch = useAppDispatch()

  const { sortBy, order, limit } = useAppSelector(state => state.adminProducts)

  return (
    <>
      <div>
        <Button colorScheme='green' onClick={onOpen}>Create</Button>
        <ModalCreate isOpen={isOpen} onClose={onClose}/>
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <SortBySelect sortBy={sortBy} setSortBy={setSortBy} dispatch={dispatch}/>
        <OrderSelect order={order} setOrder={setOrder} dispatch={dispatch}/>
        <LimitSelect limit={limit} setLimit={setLimit} dispatch={dispatch}/>
      </div>
    </>
  )
}

export default Actions