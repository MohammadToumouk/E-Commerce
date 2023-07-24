import { useState } from "react"
import "./CreateStoreModal.css"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

"use client"

const CreateStoreModal = ({title, description, isOpen, onClose, children}) => {
 
  const onChange = (open) => {
    if(!open) {
        onClose();
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onChange}  >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>  
        <div>
            {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateStoreModal
