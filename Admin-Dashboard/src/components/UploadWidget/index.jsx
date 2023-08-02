import React, {useEffect, useRef, useState} from 'react'

import { Button } from '../ui/button';

import { ImagePlus } from 'lucide-react';
import { Trash } from 'lucide-react';

const UploadWidget = ({onImageUpload, setImageUrl, imageUrl}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [images, setImages] = useState( [imageUrl] || [])

  console.log(images)
  
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
        onImageUpload(result.info.secure_url)
        setImages([result.info.secure_url])
        setImageUri(result.info.secure_url)
      }
    })
  }, [images, imageUrl])

  const onRemove = (url) => {
      setImages(images.filter((image) => image !== url))
      onImageUpload(null)
  };
  
                

  return (
    <div>      
      <div className="flex items-center">
        {images && images.map((url) => (
          <div key={url} className="relative w-[580px] h-[330px] rounded-md overflow-hidden">
            <div className='z-10 absolute top-2 right-2'>
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon"> 
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <img src={url} alt="Product Image" className="object-cover" />
          </div>
        ))}
      </div>
      <Button type="Button" variant="secondary" onClick={() => widgetRef.current.open()}>
        <ImagePlus className='h-4 w-4 mr-2' />
        Add Image
      </Button>
    </div>
  )
}

export default UploadWidget