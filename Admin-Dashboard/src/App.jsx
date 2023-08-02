import { useState, useEffect } from 'react'
import './App.css'

import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import axios from 'axios'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import SettingsProfilePage from './pages/Settings/SettingsTabs/Profile/ProfilePage'
import Home from './pages/Home'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import { Toaster } from './components/ui/toaster'
import EditOrder from './pages/EditProduct copy'


function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get('http://localhost:3069/user/profile', { withCredentials: true })
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchUser()
    if (user) {
      window.location.href = "/dashboard"
    }
  }, [])

  //console.log("currentUser:", user)

  if (user) {
    return (
    <>  
      <Toaster />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/products/add-new-product" element={<CreateProduct  />} />
        <Route path="/products/:id" element={<EditProduct />} />
        <Route path="/orders/:id" element={<EditOrder />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/settings//*" element={<Settings user={user} />} /> 
      </Routes>
      </>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth routeTo={"login"} />} />
          <Route path="/register" element={<Auth routeTo={""} />} />
        </Routes>
      </div>
    )
  }
}

export default App
