import React from 'react'
import { UserCircleIcon, HeartIcon, ShoppingCartIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, IdentificationIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline'
import ActionsItem from './ActionsItem'
import { useAuth } from '../../lib/auth'
import { useDisclosure } from '@chakra-ui/react'
import SignIn from '../signIn/SignIn'
import SignUp from '../signUp/SignUp'

const Actions = () => {

  const { isSignedIn, signOut } = useAuth()

  const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure()
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure()

  return (
    <>
      <nav>
        <ul className='flex gap-2'>
          {
            isSignedIn() ? (
              <>
                <ActionsItem name='Profile' href='/profile' icon={<UserCircleIcon className='block w-6 h-6 m-auto'/>}/>
                {/* <ActionsItem name='Favorites' href='/favorites' icon={<HeartIcon className='block w-6 h-6 m-auto'/>}/> */}
                <ActionsItem name='Cart' href='/cart' icon={<ShoppingCartIcon className='block w-6 h-6 m-auto'/>}/>
                {/* <ActionsItem name='Sign out' href='/' icon={<ArrowRightOnRectangleIcon className='block w-6 h-6 m-auto'/>} onClick={signOut}/> */}
              </>
            ) : (
              <>
                <ActionsItem name='Sign in' href='/' icon={<ArrowLeftOnRectangleIcon className='block w-6 h-6 m-auto'/>} onClick={onSignInOpen}/>
                <ActionsItem name='Sign up' href='/' icon={<IdentificationIcon className='block w-6 h-6 m-auto'/>} onClick={onSignUpOpen}/>
              </>
            )
          }
        </ul>
      </nav>
      <SignIn isOpen={isSignInOpen} onClose={onSignInClose}/>
      <SignUp isOpen={isSignUpOpen} onClose={onSignUpClose}/>
    </>
    
  )
}

export default Actions