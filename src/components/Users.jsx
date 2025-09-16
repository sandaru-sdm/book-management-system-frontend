import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const getUsers = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to fetch users');
    }
};

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleUpdate = (userId) => {
        navigate(`/update-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        if (!userId) return;
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/users/${userId}`);
            if (response.status === 200) {
                toast.success(response?.data?.message || "User deleted successfully");
                setUsers(users.filter(user => user.id !== userId));
            } else {
                toast.error(response?.data?.message || "Failed to delete user");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        setDeleteUserId(null);
        // Close modal manually if needed (Bootstrap 5)
        const modal = document.getElementById('confirmation-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style = '';
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    };

    return (
        <div className='container m-4'>
            <div className='row justify-content-center align-items-center'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div className='col-md-4 mb-4' key={user.id}>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{user.name}</h5>
                                    <p className='card-text'>Email: {user.email}</p>
                                    <button className="btn btn-primary w-100" onClick={() => handleUpdate(user.id)}>
                                        Update User
                                    </button>
                                    <button
                                        type='button'
                                        className="btn btn-danger w-100 mt-2"
                                        data-bs-toggle='modal'
                                        data-bs-target='#confirmation-modal'
                                        onClick={() => setDeleteUserId(user.id)}
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center col-12'>
                        <p>No users found.</p>
                    </div>
                )}
            </div>

            <div className='modal fade' id='confirmation-modal' tabIndex={-1} aria-labelledby='confirmation-modal-label'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='confirmation-modal-label'>Confirmation</h1>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            Do you want to delete this user?
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => handleDelete(deleteUserId)}
                                data-bs-dismiss="modal"
                                disabled={!deleteUserId}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;