import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Accordion, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import MenuItem from './MenuItem'
import { Category } from '../../types/Category'

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
      imageName
      subcategories {
        id
        name
      }
    }
  }
`

const Menu = () => {

  const { isOpen, onToggle, onClose } = useDisclosure()

  const { data, loading, error } = useQuery(CATEGORIES_QUERY)

  if(loading) return <Spinner/>
  if(error) return null

  return (
    <>
      <button className='p-2 shadow hover:shadow-inner transition-all' onClick={onToggle}>
        {isOpen ? <XMarkIcon className='block w-6 h-6'/> : <Bars3Icon className='block w-6 h-6'/>}
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size={['full', 'md', '2xl', '4xl', '6xl']} scrollBehavior='inside'>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Catalog</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Accordion allowToggle>
              <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 | gap-2'>
                {data.categories.map((category: Category) => <MenuItem key={category.id} category={category} onClose={onClose}/>)}
              </ul>
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Menu