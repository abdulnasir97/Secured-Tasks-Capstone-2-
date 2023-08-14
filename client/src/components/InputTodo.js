import React, { useState } from 'react';
const InputTodo = ({ addTodo }) => {
  const [description, setDescription] = useState('');

  function addNewTodo(e) {
    e.preventDefault();
    if(description.length < 1) return alert('Please enter a todo.');
    addTodo({
      description,
    });
    setDescription('')
  }

  return (
    <>
      <h1 className='text-center mt-5'>Todo List</h1>
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