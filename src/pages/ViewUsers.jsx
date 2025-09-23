import React, { Suspense } from 'react';
import Users from '../components/Users';
import { Link } from 'react-router-dom';

function ViewUsers() {
  return (
    <div className='container-fluid min-vh-100'>
      <div className='row py-4'>
        <div className='col-12'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h1 className='mb-0'>Users Management</h1>
            <Link to="/add-user" className="btn btn-primary">
              Add New User
            </Link>
          </div>
          
          <Suspense fallback={
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }>
            <Users />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;