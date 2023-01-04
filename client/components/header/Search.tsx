import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const Search = () => {

  const [query, setQuery] = useState<string>('')

  return (
    <div className='relative flex-auto flex flex-col items-center'>
      <input 
        type="text"
        placeholder='Search' 
        className='w-full px-4 py-2 rounded bg-gray-50 shadow-inner focus:outline-none'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Link href={query ? `/search?query=${query}` : '/'}>
        <a className='absolute right-0 flex items-center justify-center h-full px-2'>
          <MagnifyingGlassIcon className='block w-6 h-6 hover:scale-110 transition-all'/>
        </a>
      </Link>
    </div>
  )
}

export default Search