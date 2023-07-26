import * as React from "react"
import "./SelectCategory.css"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectCategory({ className }) {
  return (
    <Select >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a category" className="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="clothes">Clothes</SelectItem>
          <SelectItem value="electronic">Electronic</SelectItem>
          <SelectItem value="mobiles">Mobiles</SelectItem>
          <SelectItem value="Groceries">Groceries</SelectItem>
          <SelectItem value="Drinks">Drinks</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
