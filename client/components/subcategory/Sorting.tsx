import { Select } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Order } from '../../enums/Order'
import OrderSelect from '../UI/OrderSelect'
import SortBySelect from '../UI/SortBySelect'

type SortingProps = {
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
  order: Order
  setOrder: Dispatch<SetStateAction<Order>>
}

const Sorting: React.FC<SortingProps> = ({ sortBy, setSortBy, order, setOrder }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      <SortBySelect sortBy={sortBy} setSortBy={setSortBy}/>
      <OrderSelect order={order} setOrder={setOrder}/>
    </div>
  )
}

export default Sorting