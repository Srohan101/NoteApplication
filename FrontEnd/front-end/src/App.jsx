import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './pages/login'
import NoteState from './context/Notes/NoteState'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import About from './components/About'
import Notes from './pages/Notes'
import AuthState from './context/Auth/AuthState'

function App() {
  return (
    <>
      {/* <Login /> */}
      <AuthState>

        <NoteState>
          <div className="flex flex-col h-screen">
            <NavBar />
            <Routes>
              <Route path="/" exact element={<Notes />} />
              <Route path="/About" exact element={<About />} />
            </Routes>
          </div>
        </NoteState>
      </AuthState>
    </>
  )
}

export default App
