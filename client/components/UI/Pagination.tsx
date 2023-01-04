import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React from 'react'

type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>> | ActionCreatorWithPayload<number, string>
  page: number
  count: number
  limit: number
  dispatch?: any
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, count, limit, dispatch }) => {

  return (
    <div className='flex justify-center items-center | gap-3 p-3'>
      {page > 0 && 
        <>
          <button 
            className='p-2 shadow hover:shadow-inner transition-all' 
            onClick={() => dispatch ? dispatch(setPage(page - 1)) : setPage((prev: number) => prev - 1)}
          >
            <ArrowLongLeftIcon className='block w-6 h-6'/>
          </button>
          <button 
            className='px-3 py-2 shadow hover:shadow-inner transition-all'
            onClick={() => dispatch ? dispatch(setPage(0)) : setPage(0)}
          >1</button>
          <span>...</span>
        </>
      }
      <span className='text-red-600'>{page + 1}</span>
      {page < Math.ceil(count / limit) - 1 &&
        <>
          <span>...</span>
          <button
            className='px-3 py-2 shadow hover:shadow-inner transition-all' 
            onClick={() => dispatch ? dispatch(setPage(Math.ceil(count / limit) - 1)) : setPage(Math.ceil(count / limit) - 1)}
          >
            {Math.ceil(count / limit)}
          </button>
          <button 
            className='p-2 shadow hover:shadow-inner transition-all' 
            onClick={() => dispatch ? dispatch(setPage(page + 1)) : setPage((prev: number) => prev + 1)}
          >
            <ArrowLongRightIcon className='block w-6 h-6'/>
          </button>
        </>
      }
    </div>
  )
}

export default Pagination