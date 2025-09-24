import React from 'react';
import Books from '../components/Books';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start bg-light'>
      <div className='w-100 text-center py-5'>
        <h1 className='fw-bold mb-3'>📚 Book Management System</h1>
        <p className='text-muted mb-4'>
          Effortlessly manage your book collection.<br />
          <span className='d-block'>Add, update, and delete books with a simple interface.</span>
        </p>
        <Link to="/add-book" className="btn btn-success px-4 py-2 mb-4">
          ➕ Add New Book
        </Link>
      </div>
      <div className='w-100'>
        <Books />
      </div>
    </div>
  );
}

export default Home;