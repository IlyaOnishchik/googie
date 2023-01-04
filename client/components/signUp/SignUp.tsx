import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import SignUpForm from './SignUpForm'

type SignUpProps = {
  isOpen: boolean
  onClose: () => void
}

const SignUp: React.FC<SignUpProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['full', 'md']}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <SignUpForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignUp