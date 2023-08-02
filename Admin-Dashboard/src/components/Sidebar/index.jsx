import React from 'react'
import "./Sidebar.css"
import userprofile from '../../assets/icons/user.png'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import StoreCombobox from '../StoreCombobox'
import { LogOut, LogOutIcon, PowerIcon, ActivityIcon } from 'lucide-react'


const Sidebar = ({user}) => {

 // console.log("currentUser:", user)

  const handleLogout = async () => {
    await axios.post('http://localhost:3069/user/logout',{headers: {"Cookie": ""}}, {withCredentials: true })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    window.location.href = "/"
  }

  return (
    <div className='sidebar-container'>
      {/* <h1 className='sidebar-title'>Dashboard</h1> */}
      <div className='sidebar-storebox'>
        {/* <StoreCombobox />  */}
      </div>
      <div className='sidebar-storeLink'>
        <a href="http://localhost:5174/shop" target='_blank'>Visit Store</a>
      </div>

      <div>
        <img className="sidebar-profileImage" src={userprofile} alt="Profile Image" />
      </div>

      <p className='sidebar-username'>{user?.user?.name}</p>

      <ul className='sidebar-menu'>
        <li className='sidebar-listItem'>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "sidebar-link-active" : ""}
            >
                Dashboard
            </NavLink>
        </li>
        <li className='sidebar-listItem'>
            <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "sidebar-link-active" : ""}
            >
                Products
            </NavLink>
        </li>
        <li className='sidebar-listItem'>
            <NavLink
              to="/orders"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "sidebar-link-active" : ""}
            >
                Orders
            </NavLink>
        </li>
        <li className='sidebar-listItem'>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "sidebar-link-active" : ""}
            >
                Settings
            </NavLink>
        </li>
      </ul>

      <div className='sidebar-logout' onClick={handleLogout}>
        <PowerIcon size={24} />
      </div>
    </div>
  )
}

export default Sidebar
