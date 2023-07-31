import React from 'react'
import { Input } from '../ui/input'

export const SearchBar = ({value, onChange}) => {
  return (
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px] text-white bg-transparent add-product-input "
        value={value}
        onChange={onChange}
      />
  )
}
