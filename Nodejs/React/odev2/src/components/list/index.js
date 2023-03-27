import React from 'react'

function List({ setDone, todos }) {

  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.map((item, i) => {
      if (i === index) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setDone(updatedTodos);
  }

  const handleDeleteClick =(index) => {
    const updatedTodos = todos.filter((item, i) => i !== index);
    setDone(updatedTodos);
  }

  return (
    <ul className='list'>
      {todos.map((item, i) => (
        <li key={i}>
          <input
            type={'checkbox'}
            checked={item.done}
            onChange={() => handleCheckboxChange(i)}
          />

          <span onClick={() => handleCheckboxChange(i)}>{item.todo}</span>
          <button onClick={()=>handleDeleteClick(i)}>X</button>
        </li>
      ))}
    </ul>
  )
}

export default List