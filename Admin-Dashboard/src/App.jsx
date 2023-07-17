import { useState } from 'react'
import './App.css'

import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="flex items-center justify-center h-full">
       <Routes>
        <Route path="/login" element={<Auth routeTo={"login"}/>} />
        <Route path="/register" element={<Auth routeTo={""}/>} />
       </Routes>
    </div>
  )
}

export default App
