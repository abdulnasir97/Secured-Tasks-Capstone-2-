import React, { useState } from 'react';


// InputTodo component for adding new todos.

const InputTodo = ({ addTodo }) => {

    // State to manage the input field's value (todo description).

  const [description, setDescription] = useState('');

    // Function to add a new todo.

  function addNewTodo(e) {
    e.preventDefault();

  // Check if the description is not empty before adding.

    if(description.length < 1) return alert('Please enter a todo.');
    addTodo({
      description,
    });
    setDescription('')
  }

  return (
    <>
      <h1 className='text-center mt-5'>Add, Edit, and Delete your secured tasks below.</h1>
      <form className='d-flex mt-5'>
        <input type='text' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className='btn btn-success' onClick={addNewTodo}>
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
