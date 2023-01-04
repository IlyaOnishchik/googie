import React from 'react'
import Actions from './Actions'
import Logo from './Logo'
import Menu from './Menu'
import Search from './Search'

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='flex sm:hidden justify-between py-1'>
          <Logo/>
          <Actions/>
        </div>
        <div className='flex items-center gap-8 py-1'>
          <div className='hidden sm:block'><Logo/></div>
          <Menu/>
          <Search/>
          <div className='hidden sm:block'><Actions/></div>
        </div>
      </div>
    </header>
  )
}

export default Header