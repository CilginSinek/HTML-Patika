import { useState } from 'react';
import './App.css'
import FormList from './components/FormList'
import InputList from './components/InputList'

function App() {
  const [dragedItem, setDragedItem] = useState<any | null>(null);

  return (
    <div style={{display:"flex",flexDirection:"row"}}>
    <FormList FormObjs={[]} setDragedItem={setDragedItem} dragedItem={dragedItem}/>
    <InputList setDragedItem={setDragedItem} />
    </div>
  )
}


export default App
