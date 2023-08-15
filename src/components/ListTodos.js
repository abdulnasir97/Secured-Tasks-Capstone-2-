import React, { Fragment } from 'react';

import EditTodo from './EditTodo';

const ListTodos = ({ todos, removeTodo, updateTodo }) => {

  return (
    <Fragment>
      {' '}
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <tr key={todo.todo_id} id={`${todo.todo_id}`}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} updateTodo={updateTodo} />
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => removeTodo(todo.todo_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;