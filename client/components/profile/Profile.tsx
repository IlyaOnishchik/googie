import React from 'react'
import Admin from './admin/Admin'
import ChangePassword from './ChangePassword'
import Menu from './Menu'
import PersonalData from './PersonalData'

const Profile = () => {
  return (
    <div>
      <div className='container'>
        <div className='flex flex-col | gap-4 py-5'>
          <h1 className='text-3xl font-semibold'>Profile</h1>
          <div className='flex | gap-10'>
            <Menu/>
            <div className='flex-auto | flex flex-col | gap-5'>
              <Admin/>
              <PersonalData/>
              <ChangePassword/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile