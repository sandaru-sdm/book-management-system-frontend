import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner'; // Create this component if not exists

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUpdate = useCallback((userId) => {
        navigate(`/update-user/${userId}`);
    }, [navigate]);

    const handleDelete = async (userId) => {
        if (!userId) {
            toast.error("User ID is missing");
            return;
        }

        try {
            await userService.deleteUser(userId);
            toast.success("User deleted successfully");
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete user");
        } finally {
            setDeleteUserId(null);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center m-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className='container my-4'>
            <div className='row g-4 justify-content-center'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onUpdate={handleUpdate}
                            onDelete={setDeleteUserId}
                        />
                    ))
                ) : (
                    <div className='col-12 text-center'>
                        <p className='text-muted'>No users found.</p>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <div className='modal fade' id='confirmation-modal' tabIndex={-1}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Confirm Delete</h5>
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
                                data-bs-dismiss="modal"
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
