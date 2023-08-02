"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { CellActionOrder } from "./cell-action-order"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string
  name: string
  description: string
  image: string
  images: string[]
  price: number
  category: string
  color: string
  size: string[]
  quantity: number
  createdAt: string
  updatedAt: string
}

export const ProductColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: row.original.color }} />
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]


export const OrderColumns = [
  {
    accessorKey: "createdAt",
    header: "Ordered",
  },
  {
    accessorKey: "name",
    header: "Order ID",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  // {
  //   accessorKey: "color",
  //   header: "Color",
  // },
  // {
  //   accessorKey: "size",
  //   header: "Size",
  // },
  {
    accessorKey: "totalQuantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
  },
  /* {
    accessorKey: "shippingStatus",
    header: "Shipping",
  }, */
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionOrder data={row.original} />,
  },
]
