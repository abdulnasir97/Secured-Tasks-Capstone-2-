import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axiosInstance from '../utils/axios';

// Login component for user authentication.

export default function Login() {

  // State to manage the user's email and password.

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

    // Get the navigation function from react-router-dom.

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

    // Function to handle form submission.

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      await axiosInstance.post('/login', loginData, {
        withCredentials: true,
      });

      navigate('/todos');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='container'>
        <h1 className='text-center mt-5'>Please Login!</h1>
        <form onSubmit={onSubmitForm}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' id='email' placeholder='Enter email.' value={email} onChange={onChangeUsername} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter password.' value={password} onChange={onChangePassword} />
          </div>
          <div className='text-center'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </form>
        <div className='text-center mt-3'>
          <Link to='/register'>Sign Up</Link>
        </div>
      </div>
    </>
  );
}
