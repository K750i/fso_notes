import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(setNotes)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(response))
      noteService.setToken(response.token)
      setUser(response)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  function addNote(e) {
    e.preventDefault()
    const newObj = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(newObj).then((returnedNote) => {
      setNotes([...notes, returnedNote])
      setNewNote('')
    })
  }

  function toggleImportanceOf(id) {
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={(e) => setUsername(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in.</p>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            setNewnote={(e) => setNewNote(e.target.value)}
          />
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          >
            {note.content}
          </Note>
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
