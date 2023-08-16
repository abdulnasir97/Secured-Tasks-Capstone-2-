import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axiosInstance from '../utils/axios';

//Register component for user registeration.
export default function Register() {

  //State to manage the password, email, and name.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  //Functions to handle changes in email input.
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        name,
      };

      const response = await axiosInstance.post('/register', registerData);
      if (response.status === 200) {
       navigate('/todos');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='container'>
        <h1 className='text-center mt-5'>Please Sign Up!</h1>
        <form onSubmit={onSubmitForm}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' id='name' placeholder='Enter your name.' value={name} onChange={onChangeName} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Enter the email.' value={email} onChange={onChangeEmail} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter the password.' value={password} onChange={onChangePassword} />
          </div>

          <div className='text-center'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </form>
        <div className='text-center mt-3'>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </>
  );
}
