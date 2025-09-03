import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function SaveUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(name, email, password, confirmPassword);

        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            toast.error("Fill all the text fields");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            setIsLoading(false);
            return;
        }

        const userData = { name, email, password };

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/user`, userData);

            if (response.status === 201) {
                toast.success(response?.data?.message || "User saved successfully");
            } else {
                toast.error("Failed to save user");
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                console.error("Server responded with error:", status, data);
                toast.error(data?.message || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <div>
            <div className='container vh-100 d-flex justify-content-center align-items-center'>
                <div className='card col-md-6'>
                    <div className='card-body'>
                        <h1 className='card-title text-center'>Save User</h1>

                        <form className='row g-3 mt-3' onSubmit={handleSubmit}>

                            <div className='col-md-12'>
                                <label htmlFor='name' className='form-label'>Name</label>
                                <input type='text' className='form-control' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='col-md-12'>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <input type='email' className='form-control' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className='col-md-12'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <input type='password' className='form-control' id='password' placeholder='Paassword' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className='col-md-12'>
                                <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                                <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <div className='col-md-12'>
                                <button type='submit' className='btn btn-primary col-12 mt-4' disabled={isLoading}>Save User</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaveUser