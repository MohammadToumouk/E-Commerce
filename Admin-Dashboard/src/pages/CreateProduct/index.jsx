import { useEffect, useState } from 'react'
import "./CreateProduct.css"
"use client"

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'

import { format } from 'date-fns' 

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { XIcon } from 'lucide-react'
import { formatter } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
import { Link } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectCategory } from '@/components/SelectCategory'
import { TextareaWithLabel } from '@/components/Textarea'
import UploadWidget from '@/components/UploadWidget'

const formSchema = z.object({
  name: z.string().min(3).max(20),
  images: z.array(z.object({ url: z.string().url() })).min(1),
  price: z.string().min(1).max(50),
  quantity: z.string().min(1).max(50),
  //category: z.string().min(1).max(20),
  description: z.string().min(0).max(255),
})

 
const CreateProduct = () => {
  const [imageUrl, setImageUrl] = useState();
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        images: [],
        price: "",
        quantity: "",
        description: "",
        //category: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5173/products', {
        name: values.name,
        images: values.images,
        price: values.price,
        quantity: values.quantity,
        description: values.description,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log('Response from server:', response.data);
      // Add any further actions or notifications for successful submission here.
    } catch (error) {
      console.error('Error while submitting:', error);
      // Add error handling or notifications for failed submissions here.
    }

    console.log("testData", values)
  }

  const handleTextareaChange = (newValue) => {
    setTextareaValue(newValue);
    form.setValue("description",  newValue );
  };

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
        <div className='my-10 pl-8'>
          <div className='flex items-center'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex justify-center items-start'>
                <div className='inputs-container'> 
                  <FormField 
                    control={form.control} 
                    name="name" 
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Productname" className="add-product-input" {...field} />
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  {/* <FormField 
                    control={form.control} 
                    name="category"
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  />  */}
                  <FormField 
                    control={form.control} 
                    name="price" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                          <Input type="text" placeholder="Price in $" className="add-product-input"{...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  /> 
                  <FormField 
                    control={form.control} 
                    name="quantity" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                          <Input type="number" min="0" placeholder="Amount in Stock" className="add-product-input" {...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="description" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel></FormLabel>
                          <FormControl>
                             <TextareaWithLabel label={"Description"} className="add-product-input" onChange={handleTextareaChange} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='ml-12'>
                   <FormField 
                    control={form.control} 
                    name="images" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Image Upload</FormLabel>
                          <FormControl>
                            <UploadWidget onImageUpload={handleImageUpload} {...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  /> 
                 </div>
              </div>
                  <div className="space-x-2 flex justify-start items-center w-full">
                      <Button disabled={imageUrl ? false : true} className="create-product-button" type="submit">Create</Button>
                  </div>
              </form>
            </Form>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
