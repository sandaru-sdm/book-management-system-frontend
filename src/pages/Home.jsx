import React from 'react'
import Books from '../components/Books'

function Home() {
  return (
    <div className='d-flex align-items-center vh-100 flex-column col-12'>
        <h1 className='mt-3 text-center'>Welcome to Book Managing System</h1>
        <Books/>
    </div>
  )
}

export default Home;