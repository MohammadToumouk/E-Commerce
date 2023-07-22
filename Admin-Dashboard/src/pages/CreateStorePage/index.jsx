import { useState } from "react"
import "./CreateStorePage.css"

"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import CreateStoreModal from "@/components/CreateStoreModal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    name: z.string().min(3).max(20),
})

const CreateStorePage = () => {
  const [isOpen, setIsOpen] = useState(true)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  })

  const onClose = () => {
    setIsOpen(false)
  }
  

  const onSubmit = async (values) => {
    console.log(values)
  }


  return (
    <CreateStoreModal title="Create Store" description="Create a new store" isOpen={isOpen} onClose={()=>{}}>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control} 
              name="name" 
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="E-Commerce" className="ml--4 text-black" {...field} />
                    </FormControl>
                    <FormMessage>

                    </FormMessage>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex justify-end items-center w-full">
                <Button variant="outline" onClick={onClose} >Cancel</Button>
                <Button type="submit">Continue</Button>
            </div>
        </form>
    </Form>
  </CreateStoreModal>
  )
}

export default CreateStorePage
