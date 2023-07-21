import "./cell-action.css"
"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

export const CellAction = ({data}) => {
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
                <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-red-600">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>                
        </DropdownMenu>
    )
}
