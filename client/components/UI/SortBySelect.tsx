import { Select } from '@chakra-ui/react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React, { Dispatch, SetStateAction } from 'react'

type SortBySelectProps = {
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>> | ActionCreatorWithPayload<string, string>
  dispatch?: any
}

const SortBySelect: React.FC<SortBySelectProps> = ({ sortBy, setSortBy, dispatch }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch ? dispatch(setSortBy(e.target.value)) : setSortBy(e.target.value)

  return (
    <div className='flex items-center gap-2'>
      <span className='whitespace-nowrap'>Sort by:</span>
      <Select value={sortBy} onChange={handleChange}>
        <option value='default'>Default</option>
        <option value='name'>Name</option>
        <option value='price'>Price</option>
      </Select>
    </div>
  )
}

export default SortBySelect