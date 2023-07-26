"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { Trash, Upload } from 'lucide-react';
import UploadWidget from '../UploadWidget';

const ImageUpload = ({disabled, onChange, onRemove, value}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  const onUpload = (result) => {
    onChange(result.info.secure_url);
  } 

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gab-4">
        {value && value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className='z-10 absolute top-2 right-2'>
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon"> 
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <img src={url} alt="Product Images" className="object-cover" />
          </div>
        ))}
      </div>
      <UploadWidget disabled={disabled} onClick={open()} />
    </div>
  )
}

export default ImageUpload
