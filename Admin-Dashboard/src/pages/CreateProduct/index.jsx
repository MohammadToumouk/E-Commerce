import { useEffect, useState } from 'react'

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'

import { format } from 'date-fns' 

import { Button } from '@/components/ui/button'
import { Plus, XIcon } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ProductColumns } from "../../components/Tables/columns"
import { formatter } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
import { Link } from 'react-router-dom'
 
const CreateProduct = () => {
  const [products, setProducts] = useState()

  const addNewProduct = (e) => {
    e.preventDefault()

    window.location.href = "/products/add"
  }

  useEffect(() => {
    const fetchProducts = async () => {
        await axios.get('http://localhost:3069/product', { withCredentials: true })
          .then((response) => {
            setProducts(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchProducts()
  }, [])

  const formattedProducts = products?.products?.map((product) => ({
    id: product._id,
    name: product.name,
    price: formatter.format(product.price),
    category: product.category,
    quantity: product.quantity,
    createdAt: format(new Date(product.createdAt), 'dd/MM/yyyy'),
    updatedAt: format(new Date(product.updatedAt), 'dd/MM/yyyy'),
  }))

  console.log("allProducts", products)

  return (
    <div className='products-container'>
      <Sidebar />
      <div className='products-content'>
        <div className='products-header'>
          <TitleHeadings 
            title='Create Product'
            subtitle="Add a new product to your store"
          />
          <Link to='/products'>
            <Button 
              variant="outline" 
              className="addProduct-button" 
              size="sm" 
            >
              <XIcon size={20} /> 
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
