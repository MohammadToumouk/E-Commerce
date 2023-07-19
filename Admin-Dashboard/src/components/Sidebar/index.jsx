import React from 'react'
import "./Sidebar.css"
import userprofile from '../../assets/icons/user.png'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import StoreCombobox from '../StoreCombobox'


const Sidebar = () => {

  const handleLogout = async () => {
    await axios.post('http://localhost:3069/user/logout',{headers: {"Cookie": ""}}, {withCredentials: true })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    window.location.href = "/login"
  }

  return (
    <div className='sidebar-container'>
      {/* <h1 className='sidebar-title'>Dashboard</h1> */}
      <div className='sidebar-storebox'>
        {/* <StoreCombobox />  */}
      </div>

      <div>
        <img className="sidebar-profileImage" src={userprofile} alt="logo" />
      </div>

      <p className='sidebar-username'>Username</p>

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
        logout
      </div>
    </div>
  )
}

export default Sidebar
