import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const getUsers = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users`);
        return response.data; 
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch users');
    }
};

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                if (data) setUsers(data);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUpdate = useCallback((userId) => {
        navigate(`/update-user/${userId}`);
    }, [navigate]);

    const handleDelete = async (userId) => {
        if (!userId) return;
        
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
            
            if (response.status === 200) {
                toast.success(response?.data?.message || "User deleted successfully");
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete user");
        } finally {
            setDeleteUserId(null);
            // Close modal manually if needed
            const modalElement = document.getElementById('confirmation-modal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-50">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading users...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='container my-4'>
            <div className='row g-4 justify-content-center'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div className='col-12 col-md-6 col-lg-4' key={user.id}>
                            <div className='card h-100 shadow-sm'>
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title fw-bold mb-3'>{user.name}</h5>
                                    <p className='card-text mb-4'>
                                        <i className="bi bi-envelope me-2"></i>
                                        {user.email}
                                    </p>
                                    <div className='mt-auto'>
                                        <button 
                                            className="btn btn-outline-primary w-100 mb-2" 
                                            onClick={() => handleUpdate(user.id)}
                                        >
                                            <i className="bi bi-pencil me-2"></i>
                                            Update
                                        </button>
                                        <button
                                            type='button'
                                            className="btn btn-outline-danger w-100"
                                            data-bs-toggle='modal'
                                            data-bs-target='#confirmation-modal'
                                            onClick={() => setDeleteUserId(user.id)}
                                        >
                                            <i className="bi bi-trash me-2"></i>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-12 text-center'>
                        <p className='text-muted'>No users found.</p>
                    </div>
                )}
            </div>

            <div className='modal fade' id='confirmation-modal' tabIndex={-1} aria-labelledby='confirmation-modal-label'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='confirmation-modal-label'>
                                Confirm Delete
                            </h5>
                            <button 
                                type='button' 
                                className='btn-close' 
                                data-bs-dismiss="modal" 
                                aria-label='Close'
                            />
                        </div>
                        <div className='modal-body'>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </div>
                        <div className='modal-footer'>
                            <button 
                                type='button' 
                                className='btn btn-secondary' 
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => handleDelete(deleteUserId)}
                                disabled={!deleteUserId}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
