import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import SignInForm from './SignInForm'

type SignInProps = {
  isOpen: boolean
  onClose: () => void
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['full', 'md']}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <SignInForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignIn