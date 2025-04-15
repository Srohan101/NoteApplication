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
import SignupForm from './pages/SignupForm'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <AuthState>

        <NoteState>
          <div className="flex flex-col h-screen">

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <NavBar />
                    <Notes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PrivateRoute>
                    <NavBar />
                    <About />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </NoteState>
      </AuthState>
    </>
  )
}

export default App
