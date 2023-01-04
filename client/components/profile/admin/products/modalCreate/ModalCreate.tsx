import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import ModalCreateMain from './ModalCreateMain'
import ModalCreateParameters from './ModalCreateParameters'
import { useFile } from '../../../../../hooks/useFile'
import { useAppSelector } from '../../../../../redux/hooks'
import { useCreateProduct } from '../../../../../hooks/product/useCreateProduct'


type ModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

const ModalCreate: React.FC<ModalCreateProps> = ({ isOpen, onClose }) => {

  const { subcategoryId, name, price, image, parameters } = useAppSelector(state => state.productCreation)
  const { create } = useCreateProduct()
  const { upload } = useFile()

  const handleCreate = () => {
    if(subcategoryId && name && price && image) {
      create(subcategoryId, name, price, image.name, parameters)
      upload(image)
      onClose()
    }
    else alert('Uncorrect input!')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Create new product</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Main</Tab>
              <Tab>Parameters</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ModalCreateMain/>
              </TabPanel>
              <TabPanel>
                <ModalCreateParameters/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={handleCreate}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCreate