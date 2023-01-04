import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react'
import React from 'react'
import Filters from './Filters'

type FiltersModalProps = {
  isOpen: boolean
  onClose: () => void
}

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='full' scrollBehavior='inside'>
      <ModalContent>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Filters/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FiltersModal