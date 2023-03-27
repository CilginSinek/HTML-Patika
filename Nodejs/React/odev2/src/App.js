import { useState } from 'react'
import './App.css';
import List from './components/list';
import Input from './components/input';

function App() {
  
  const [todos, setTodos] = useState([]);

  return (
    <>
      
      <Input addTodos={setTodos} todos={todos} />
      <List setDone={setTodos} todos={todos} />
    </>
  );
}

export default App;
