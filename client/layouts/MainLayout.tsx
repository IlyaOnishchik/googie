import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='h-full grid grid-rows-[auto_1fr_auto]'>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default MainLayout