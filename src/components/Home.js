import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Fragment>
      <div className='container'>
        <h1 className='text-center mt-5'>Secured Tasks</h1>
        <div className='text-center mt-5 flex-center'>
          <Link to='/login'>
            <Button variant='primary' className='button'>
              Login!
            </Button>
          </Link>
          <Link to='/register'>
            <Button variant='primary' className='button'>
              Sign Up!
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}