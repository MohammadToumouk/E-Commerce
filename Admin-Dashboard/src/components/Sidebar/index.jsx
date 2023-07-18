import React from 'react'
import "./Sidebar.css"
import userprofile from '../../assets/icons/user.png'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      {/* <h1 className='sidebar-title'>Dashboard</h1> */}

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

      <div className='sidebar-logout'>
        <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "ssidebar-logout-active" : ""}
        >
            Logout
        </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
