import { useEffect, useState } from 'react'
import "./Orders.css"

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'

import { format } from 'date-fns' 

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { OrderColumns } from "../../components/Tables/columns"
import { formatter } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
 
const Orders = () => {
  const [orders, setOrders] = useState()

  useEffect(() => {
    const fetchOrders = async () => {
        await axios.get('http://localhost:3069/order', { withCredentials: true })
          .then((response) => {
            setOrders(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchOrders()
  }, [])

  const formattedOrders = orders?.orders?.map((order) => ({
    id: order._id,
    name: order.name,
    products: order?.products?.map((product) => product.product +" ("+ product.quantity + ")").join(', '),
    totalQuantity: order?.products?.map((product) => product.quantity).reduce((a, b) => a + b, 0),
    total: formatter.format(order.total),
    paymentStatus: order.paymentStatus,
    shippingAddress: order.shippingAddress,
    shippingStatus: order.shippingStatus,
    quantity: order.quantity,
    createdAt: format(new Date(order.createdAt), 'dd/MM/yyyy'),
    updatedAt: format(new Date(order.updatedAt), 'dd/MM/yyyy'),
  }))

  console.log("allOrders", orders?.orders)

  return (
    <div className='orders-container'>
      <Sidebar />
      <div className='orders-content'>
        <div className='orders-header'>
          <TitleHeadings 
            title='Orders'
            elements={orders?.orders?.length}
            subtitle='Manage all of your orders'
          />
          {/* <Button 
            variant="outline" 
            className="addProduct-button" 
            size="sm" 
          >
            <Plus className='mr-2' size={16} /> Add Product
          </Button> */}
        </div>
        <div className='mt-10'>
            {formattedOrders && <DataTable columns={OrderColumns} data={formattedOrders} searchKey={ ["name", "email", "id"]} />}
        </div>
      </div>
    </div>
  )
}

export default Orders
