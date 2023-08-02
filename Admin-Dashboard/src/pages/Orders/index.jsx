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
 
const Orders = ({user}) => {
  const [orders, setOrders] = useState()
  const [paymentIntents, setPaymentIntents] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
        await axios.get('http://localhost:3069/stripe/checkout/create-checkout-session', { withCredentials: true })
          .then((response) => {
            setPaymentIntents(response.data.paymentIntents.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchOrders()
  }, [])

  const formattedOrders = paymentIntents.map((intent) => ({
    id: intent.id,
    name: intent.id, // Assuming 'name' corresponds to 'description' in the JSON
    customer: intent.shipping?.name, // Assuming 'products' corresponds to 'shipping.name' in the JSON
    totalQuantity: intent.amount_received,
    total: formatter.format(intent.amount / 100), // Assuming 'total' corresponds to 'amount' in the JSON
    paymentStatus: intent.status,
    shippingAddress: intent.shipping?.address?.city + " " + intent.shipping?.address?.country + " " + intent.shipping?.address?.line1 + " " + intent.shipping?.address?.line2 ,
    shippingStatus: intent.shipping?.carrier,
    quantity: intent.amount_received,
    createdAt: format(new Date(intent.created * 1000), 'dd/MM/yyyy'),
    updatedAt: format(new Date(intent.created * 1000), 'dd/MM/yyyy'),
  }));
  



  return (
    <div className='orders-container'>
      <Sidebar user={user}/>
      <div className='orders-content'>
        <div className='orders-header'>
          <TitleHeadings 
            title='Orders'
            elements={paymentIntents?.length}
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
            {paymentIntents && <DataTable columns={OrderColumns} data={formattedOrders} searchKey="products"/>}
        </div>
      </div>
    </div>
  )
}

export default Orders
