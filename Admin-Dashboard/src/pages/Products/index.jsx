import React from 'react'
import "./Products.css"
import Sidebar from '@/components/Sidebar'

const Products = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar />
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title' >Products</h1>
        </div>
      </div>
    </div>
  )
}

export default Products
