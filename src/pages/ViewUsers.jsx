import React from 'react'
import Users from '../components/Users';

function ViewUsers() {
  return (
    <div className='d-flex align-ites-center vh-100 flex-column col-12'>
        <h1 className='mt-3 text-center'>Users Page</h1>
        <Users />
    </div>
  )
}

export default ViewUsers;