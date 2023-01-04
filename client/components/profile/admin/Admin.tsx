import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import Products from './products/Products'
import Users from './users/Users'

const Admin = () => {
  return (
    <section className='p-5 | rounded-xl | bg-gray-100 shadow-md'>
      <h2 className='mb-5 | text-xl font-semibold'>Admin panel</h2>
      <Tabs>
        <TabList>
          <Tab>Products</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <Products/>
          <Users/>
        </TabPanels>
      </Tabs>
    </section>
  )
}

export default Admin