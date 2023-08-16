import React, { fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todos from './components/Todos';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import Register from './components/Register';

// Implement your authentication logic here.
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};

// PrivateRoute component to handle protected routes.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Routes>
    {' '}
    <Route {...rest} render={(props) => (isAuthenticated() ? <Component {...props} /> : <LoginPage />)} />{' '}
  </Routes>
);

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/todos' element={<Todos/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
