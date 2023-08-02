import {useEffect, useState } from 'react'
import "./EditOrder.css"
"use client"

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

import { XIcon } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { Link, useParams } from 'react-router-dom'

import { Button } from "@/components/ui/button"

import { TextareaWithLabel } from '@/components/Textarea'
import UploadWidget from '@/components/UploadWidget'


 
const EditOrder = () => {
  const orderId = useParams();
  const { toast } = useToast()
  const [product, setProduct] = useState();

  const [brand , setBrand] = useState();
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState();
  const [sizes, setSizes] = useState();
  const [color, setColor] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
        await axios.get( `http://localhost:3069/orders/${orderId.id}`, { withCredentials: true })
          .then((response) => {
            setProduct(response.data)
            setBrand(response.data.product.brand)
            setName(response.data.product.name)
            setImageUrl(response.data.product.images[0])
            setPrice(response.data.product.price)
            setQuantity(response.data.product.quantity)
            setCategory(response.data.product.category)
            setSizes(response.data.product.sizes)
            setColor(response.data.product.color)
            setDescription(response.data.product.description)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchProduct()
  }, [])

  console.log("product", product)
 
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3069/product/${productId.id}`, {
        name: name,
        images: [imageUrl],
        price: parseInt(price),
        quantity: parseInt(quantity),
        description: description,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log('Response from server:', response.data);
      // Add any further actions or notifications for successful submission here.
      toast({
        title: "Product has been updated",
        type: "success",
        duration: 5000,
      })

    } catch (error) {
      console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
      console.log("DataWithError", error)
    }

  }


  const handleImageUpload = async (newImage) => {
    await setImageUrl(newImage);
    form.setValue("images", [{ url: newImage }]);
  };


 
  return (
    <div className='products-container'>
      <Sidebar />
      <div className='products-content'>
        <div className='products-header'>
          <TitleHeadings 
            title='Edit Orders'
            subtitle="Change your orders here"
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
        <div className='my-10 pl-8'>
          <div className='flex items-center'>
              <form onSubmit={onSubmit}>
              <div className='flex justify-center items-start'>
                <div className='inputs-container'> 
                  <label className="add-product-input-container" >
                    Name* 
                  </label>
                  <div className="add-product-input-container" >
                    <input type="text" value={name} className="add-product-input" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <label className="add-product-input-container mt-5" >
                    Brand* 
                  </label>
                  <div className="add-product-input-container" >
                    <input type="text" value={brand} className="add-product-input" onChange={(e) => setBrand(e.target.value)} />
                  </div>
                  <label className="add-product-input-container mt-5" >
                    Price* 
                  </label>
                  <div className="add-product-input-container" >
                    <input type="number" value={price} className="add-product-input" onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <label className="add-product-input-container mt-5" >
                    Quantity* 
                  </label>
                  <div className="add-product-input-container" >
                    <input type="number" value={quantity} className="add-product-input" onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                  <div className='input-item-container mt-2 '>
        
                    <label>Description</label>
                      <textarea
                      value={description} // Make sure this is set correctly
                      placeholder={"Please type your description for your product here"}
                      className="add-product-input w-[550px]  h-[220px]"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>              
                </div>
                <div className='ml-12'>
                      <div className='input-item-container'>
                          <label>Image Upload*</label>
                          <div>
                            <UploadWidget onImageUpload={handleImageUpload} setImageUrl={setImageUrl} imageUrl={imageUrl}/>
                          </div>
                      </div>
                 </div>
              </div>
                  <div className="space-x-2 flex justify-start items-center w-full mt-20">
                      <Button onSubmit={onSubmit} disabled={imageUrl ? false : true} className="create-product-button px-10" >Update</Button>
                  </div>
              </form> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditOrder
