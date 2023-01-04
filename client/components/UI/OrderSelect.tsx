import { Select } from '@chakra-ui/react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React, { Dispatch, SetStateAction } from 'react'
import { Order } from '../../enums/Order'

type OrderSelectProps = {
  order: Order
  setOrder: Dispatch<SetStateAction<Order>> | ActionCreatorWithPayload<Order, string>
  dispatch?: any
}

const OrderSelect: React.FC<OrderSelectProps> = ({ order, setOrder, dispatch }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch ? dispatch(setOrder(e.target.value)) : setOrder(e.target.value)

  return (
    <div className='flex items-center gap-2'>
      <span className='whitespace-nowrap'>Order:</span>
      <Select value={order} onChange={handleChange}>
        <option value={Order.ASC}>Ascending</option>
        <option value={Order.DESC}>Descending</option>
      </Select>
    </div>
  )
}

export default OrderSelect