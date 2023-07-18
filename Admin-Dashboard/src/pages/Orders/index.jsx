import React from 'react'
import "./Orders.css"
import Sidebar from '@/components/Sidebar'

const Orders = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar />
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title' >Orders</h1>
        </div>
      </div>
    </div>
  )
}

export default Orders
