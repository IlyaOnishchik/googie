import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Profile from '../components/profile/Profile'
import Loading from '../components/UI/Loading'

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      email
      cart {
        id
        products {
          id
          name
          price
          imageName
        }
      }
    }
  }
`

const ProfilePage = () => {

  const { loading, error } = useQuery(CURRENT_USER_QUERY)
  
  const router = useRouter()

  if (loading) return <Loading/>
  if (error) router.push('/')
  
  return (
    <Profile/>
  )
}

export default ProfilePage