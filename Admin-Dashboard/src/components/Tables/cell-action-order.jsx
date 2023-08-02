import "./cell-action.css"
"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import axios from "axios"

export const CellActionOrder = ({data, setProducts}) => {
    
    console.log("data:", data)

    const handleRemoveFromCart = async () => {
        try {
            const response = await axios.delete(`http://localhost:3069/orders/${data.id}`,
                { withCredentials: true },
            )
            console.log("responseRemove", response)

            toast({
                title: `${data.name} Product successfully deleted`,
                type: "success",
                duration: 5000,
            })
      
        } catch (error) {
            console.log("remove", error)
        }
        window.location.reload()
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-4 p-0 cell-action-button">
                    <span className="sr-only">Open options</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Update
                </DropdownMenuLabel>
                <NavLink to={`/orders/${data.id}`}>
                    <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem onClick={handleRemoveFromCart}>
                    <Trash className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-red-600">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>                
        </DropdownMenu>
    )
}
