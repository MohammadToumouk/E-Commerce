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
import { UploadPicture } from '@/components/UploadPicture'
import { SelectCategory } from '@/components/SelectCategory'
import { TextareaWithLabel } from '@/components/Textarea'
import UploadWidget from '@/components/UploadWidget'
import ImageUpload from '@/components/ImageUpload'

const formSchema = z.object({
  name: z.string().min(3).max(20),
  image: z.string().url(),
  category: z.string().min(0).max(20),
  price: z.string().min(1).max(50),
  quantity: z.string().min(1).max(50),
  description: z.string().min(0).max(255),
})

 
const CreateProduct = () => {
  const [products, setProducts] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        image: imageUrl,
        category: "",
        price: "",
        quantity: "",
        description: "",

    },
  })

  const onSubmit = async (values) => {
    console.log(values)
  }

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "your_cloudinary_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      console.log("Image uploaded successfully:", response.data.url);
      // You can now save the URL to your database or display the uploaded image on your website.
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
                  <FormField 
                    control={form.control} 
                    name="category"
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            {/* <SelectCategory {...field} className="add-product-input"/> */}
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  />
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
                            {/* <TextareaWithLabel label={"Description"} className="add-product-input" {...field}/> */}
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='ml-12'>
                  <div className='product-image-container'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png" alt="product" />
                  </div>
                  {/* <FormField 
                    control={form.control} 
                    name="image" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Select Image</FormLabel>
                          <FormControl>
                            <>
                            <Input id="picture" type="file" onClick={handleImageChange}placeholder="Product Image" className="text-neutral-400" {...field} />

                            <div className="pt-2 space-x-2 flex justify-end items-center w-full">
                              <Button onClick={handleImageUpload} className="bg-black" type="submit">Upload Image</Button>
                            </div>
                            </>
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  /> */}
                  <FormField 
                    control={form.control} 
                    name="imageUrl" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Image Upload</FormLabel>
                          <FormControl>
                            <UploadWidget /> 
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                 </div>
              </div>
                  <div className="space-x-2 flex justify-start items-center w-full">
                      <Button className="create-product-button" type="submit">Create</Button>
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
