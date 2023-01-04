import { Button, Menu, MenuItem, Popover, PopoverBody, PopoverContent, PopoverTrigger, Td, Tr, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useDeleteProduct } from '../../../../hooks/product/useDeleteProduct'
import { Product } from '../../../../types/Product'
import ModalEdit from './modalEdit/ModalEdit'

type TableItemProps = {
  product: Product
}

const TableItem: React.FC<TableItemProps> = ({ product }) => {

  const { isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { remove } = useDeleteProduct()
  const handleDelete = () => { 
    remove(product.id)
    onPopoverClose() 
  }

  return (
    <Popover isOpen={isPopoverOpen} onOpen={onPopoverOpen} onClose={onPopoverClose}>
      <PopoverTrigger>
        <Tr cursor='pointer'>
          <Td>{product.name}</Td>
          <Td>{product.price} $</Td>
          <Td>{product.id}</Td>
        </Tr>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <div className='flex flex-col | gap-2'>
            <Link href={`/products/${product.id}`}><Button variant='outline'>Show</Button></Link>
            <Button variant='outline' onClick={onModalOpen}>Edit</Button>
            <ModalEdit isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} productId={product.id}/>
            <Button variant='outline' colorScheme='red' onClick={handleDelete}>Delete</Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default TableItem