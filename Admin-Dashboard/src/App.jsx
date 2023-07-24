import { useState } from 'react'
import './App.css'

import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import { useEffect } from 'react'

import axios from 'axios'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import SettingsProfilePage from './pages/Settings/SettingsTabs/Profile/ProfilePage'


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
    } else {
      
    }

  }, [])

  console.log("currentUser:", user)

  if (user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className='app-dashboard-container'>
          <Sidebar />
          
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings//*" element={<Settings />} /> 
        </Routes>
      </div>
    )
  }
      
  if(!user) {
  return (
    <div className="flex items-center justify-center h-full">
       <Routes>
        <Route path="/login" element={<Auth routeTo={"login"}/>} />
        <Route path="/register" element={<Auth routeTo={""}/>} />
       </Routes>
    </div>
    )
  }
}

export default App
