import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
      <a className='flex items-center gap-2'>
        <img src="/googie.svg" className='block w-8 h-8' alt="" />
        <span className='hidden md:block text-2xl font-bold uppercase'>googie</span>
      </a>
    </Link>
  )
}

export default Logo