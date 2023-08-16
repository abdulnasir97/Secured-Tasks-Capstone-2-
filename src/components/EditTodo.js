import React, { Fragment, useState } from 'react';

// EditTodo component that allows editing a todo item.
const EditTodo = ({ todo, updateTodo }) => {
  const [editTodo, setDescription] = useState(todo);


// Function to handle updating the todo's description.
  async function updateDescription(e) {
    e.preventDefault();

// Check if the description is empty before updating.
if (editTodo.description.length < 1) {
      alert('Description cannot be empty');
      return;
    }
    updateTodo(editTodo);
  }

  return (
    <Fragment>
      <button type='button' className='btn btn-warning' data-toggle='modal' data-target={`#id${editTodo.todo_id}`}>
        Edit
      </button>
      {/* 
        id = id10
      */}
      <div
        className='modal'
        id={`id${editTodo.todo_id}`}
        onClick={() =>
          setDescription((prev) => {
            return { ...prev, description: todo.description };
          })
        }
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Todo</h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={() =>
                  setDescription((prev) => {
                    return { ...prev, description: todo.description };
                  })
                }
              >
                &times;
              </button>
            </div>

            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={editTodo.description}
                onChange={(e) =>
                  setDescription((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-warning' data-dismiss='modal' onClick={(e) => updateDescription(e)}>
                Edit
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={() =>
                  setDescription((prev) => {
                    return { ...prev, description: todo.description };
                  })
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
