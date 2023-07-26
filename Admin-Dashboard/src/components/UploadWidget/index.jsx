import React, {useEffect, useRef, useState} from 'react'

import { Button } from '../ui/button';

import { ImagePlus } from 'lucide-react';
import { Trash } from 'lucide-react';


const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [images, setImages] = useState([]);
  
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'dw7ny1wqs',
        uploadPreset: 'emazingDashboard',
        sources: ['local', 'url', 'camera', 'image_search', 'facebook', 'instagram'],
        multiple: true,
        defaultSource: 'local',             

    }, function(error, result) {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info.secure_url);
        console.log(result.info)
        setImages([result.info.secure_url])
      }
    })

  }, [])
                

  return (
    <div>      
      <div className="flex items-center">
        {images && images.map((url) => (
          <div key={url} className="relative w-[400px] h-[225px] rounded-md overflow-hidden">
            <div className='z-10 absolute top-2 right-2'>
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon"> 
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <img fill src={url} alt="Product Images" className="object-cover" />
          </div>
        ))}
      </div>
      <Button type="Button" variant="secondary" onClick={() => widgetRef.current.open()}>
        <ImagePlus className='h-4 w-4 mr-2' />
        Add Product Image
      </Button>
    </div>
  )
}

export default UploadWidget