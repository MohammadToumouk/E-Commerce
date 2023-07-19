import React from 'react'
import "./Dashboard.css"
import TitleHeadings from '@/components/TitleHeading'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <TitleHeadings title='Dashboard' subtitle='Welcome to the Dashboard' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
