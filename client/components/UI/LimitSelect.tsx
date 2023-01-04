import { Select } from '@chakra-ui/react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React, { Dispatch, SetStateAction } from 'react'

type LimitSelectProps = {
  limit: number
  setLimit: Dispatch<SetStateAction<number>> | ActionCreatorWithPayload<number, string>
  dispatch?: any
}

const LimitSelect: React.FC<LimitSelectProps> = ({ limit, setLimit, dispatch }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch 
    ? dispatch(setLimit(parseInt(e.target.value))) 
    : setLimit(parseInt(e.target.value))

  return (
    <div className='flex items-center gap-2'>
      <span className='whitespace-nowrap'>Limit:</span>
      <Select value={limit} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </Select>
    </div>
  )
}

export default LimitSelect