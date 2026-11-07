import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/add-contact" element={<AddContact/>} />
        <Route path="/edit-contact/:id" element={<EditContact/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App