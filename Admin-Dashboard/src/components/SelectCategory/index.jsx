import React from "react"
import { useState } from "react";
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

export function SelectCategory({ className, onCategoryChange }) {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onCategoryChange(selectedValue); // Call the parent's function with the selected value
  };

  return (
    <Select >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a category" className="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem onChange={handleSelectChange} value="clothes">Clothes</SelectItem>
          <SelectItem value="electronic">Electronic</SelectItem>
          <SelectItem value="mobiles">Mobiles</SelectItem>
          <SelectItem value="Groceries">Groceries</SelectItem>
          <SelectItem value="Drinks">Drinks</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
