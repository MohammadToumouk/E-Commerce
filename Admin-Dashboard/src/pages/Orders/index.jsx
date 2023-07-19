import "./Orders.css"
import TitleHeadings from '@/components/TitleHeading'

const Orders = () => {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <TitleHeadings title='Orders' subtitle='Welcome to the Orders' />
        </div>
      </div>
    </div>
  )
}

export default Orders
