import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useUpdateProduct } from '../../../../../hooks/product/useUpdateProduct'
import ModalEditMain from './ModalEditMain'
import ModalEditParameters from './ModalEditParameters'

type ModalEditProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  productId: string
}

const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onOpen, onClose, productId }) => {

  const { update } = useUpdateProduct()

  const handleSave = () => { update(productId) }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit product</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Main</Tab>
              <Tab>Parameters</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ModalEditMain productId={productId}/>
              </TabPanel>
              <TabPanel>
                <ModalEditParameters/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEdit