import './App.css'
import NoteForm from './Components/NoteForm'
import Notes from './Components/Notes'
import SearchBar from './Components/SearchBar'


function App() {

  return (
    <>
      <h1>NoteApp</h1>
      <SearchBar/>
      <NoteForm/>
      <Notes/>
    </>
  )
}

export default App
