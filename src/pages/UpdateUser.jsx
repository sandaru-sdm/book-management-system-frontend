import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

// Function to get user details by ID
const getUserById = async (userId) => {
  if (userId === undefined) return;
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch user details");
  }
};

function UpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get User details by id and set to state variables
  useEffect(() => {
    (async () => {
      if (!userId) {
        toast.error("User ID is missing in the URL");
        return;
      }
      const data = await getUserById(userId);
      if (!data) {
        toast.error("No data found for the given User ID");
        return;
      }
      setEmail(data.email);
      setName(data.name);
    })();
  }, [userId]);

  // Submit form function
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "" || email === "") {
      toast.error("Fill all the text fields");
      setIsLoading(false);
      return;
    }

    const userData = { name, email };

    // Update user API call
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/users/${userId}`, userData);

      if (response.status === 200) {
        toast.success(response?.data?.message || "User updated successfully");
      } else {
        toast.error(response?.data?.message || "Failed to update user");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <div>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className='card col-6'>
          <div className='card-body'>
            <h1 className='text-center card-title fw-bold'>Update User</h1>
            <form onSubmit={submitForm} className='row g-3'>
              <div className='col-md-12'>
                <label className='form-label' htmlFor='name'>Name</label>
                <input
                  type="text"
                  id='name'
                  className='form-control'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='col-md-12'>
                <label className='form-label mt-2' htmlFor='email'>Email</label>
                <input
                  type="email"
                  id='email'
                  className='form-control'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='col-md-12'>
                <button type="submit" className='btn btn-primary mt-3 col-12' disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;