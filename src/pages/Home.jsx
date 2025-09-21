import React from 'react';
import Books from '../components/Books';

function Home() {
  return (
    <div className='container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start'>
      <h1 className='mt-4 mb-2 text-center fw-bold'>📚 Welcome to Book Managing System</h1>
      <p className='text-center mb-4 text-muted'>
        Manage your book collection easily. Add, update, and delete books with a simple interface.
      </p>
      <Books />
    </div>
  );
}

export default Home;