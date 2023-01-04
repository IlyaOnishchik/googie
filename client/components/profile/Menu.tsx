import { ArrowRightOnRectangleIcon, ChartBarSquareIcon, DocumentTextIcon, PencilIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useAuth } from '../../lib/auth'
import MenuItem from './MenuItem'

const Menu = () => {

  const { signOut } = useAuth()

  return (
    <ul className='self-start | flex flex-col | gap-2 p-5 | rounded-xl | bg-gray-100 shadow-md'>
      <MenuItem name='Admin panel' icon={<ChartBarSquareIcon className='block w-6 h-6'/>}/>
      <MenuItem name='Personal data' icon={<DocumentTextIcon className='block w-6 h-6'/>}/>
      <MenuItem name='Change password' icon={<PencilIcon className='block w-6 h-6'/>}/>
      <MenuItem name='Sign out' href='/' icon={<ArrowRightOnRectangleIcon className='block w-6 h-6'/>} onClick={signOut}/>
    </ul>
  )
}

export default Menu