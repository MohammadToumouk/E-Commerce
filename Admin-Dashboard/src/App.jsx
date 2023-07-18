import './App.css'

import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'

function App() {
  return (
    <div className="flex items-center justify-center h-full">
       <Routes>
        <Route path="/login" element={<Auth routeTo={"login"}/>} />
        <Route path="/register" element={<Auth routeTo={""}/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
       </Routes>
    </div>
  )
}

export default App
