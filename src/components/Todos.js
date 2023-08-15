// after authentication, this is the main component

//useNavigate is used to navigate between pages without refreshing the page

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListTodos from './ListTodos';
import InputTodo from './InputTodo';
import axiosInstance from '../utils/axios';

export default function Todos() {
  const [auth, setAuth] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTodos();
  }, []);


  // 
  async function verifyToken() {
    try {
      const response = await axiosInstance.get('/verify');
      console.log(response.data);
      setAuth(true);
    } catch (err) {
      console.error('nooo', err.message);
      navigate('/login');
    }
  }

  async function addTodo(todo) {
    try {
      const response = await axiosInstance.post('/todo', todo);
      const newTodo = response.data.todo;
      console.log(newTodo);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function removeTodo(id) {
    try {
      const deleteTodo = await axiosInstance.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTodos() {
    try {
      await verifyToken();

      const response = await axiosInstance.get('/todo');
      const allTodos = response.data;
      const sortTodos = allTodos.sort((a, b) => a.todo_id - b.todo_id).reverse();
      console.log(sortTodos);
      setTodos(sortTodos);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateTodo(todo) {
    try {
      const body = { description: todo.description };
      const response = await axiosInstance.put(`/todo/${todo.todo_id}`, body);
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  }

  if (!auth) return <div>loading...</div>;

  return (
    <>
      <div className='container'>
        <InputTodo addTodo={addTodo} />
        <ListTodos todos={todos} removeTodo={removeTodo} addTodo={addTodo} updateTodo={updateTodo} />

        <div>
          {/* logout button */}
          <button
            className='btn btn-primary logout'
            onClick={() => {
              axiosInstance.get('/logout');
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}