import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL

  export function Recentorders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchOrders = async () => {
        await axios
          .get(baseUrl + "/api/order")
          .then((Response) => {
            setOrders(Response.data.orders);
            console.log(Response.data.orders[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchOrders();
      
    }, []);

    return (
      <div className="space-y-4 shadow-2xl p-4 rounded-xl">
        {orders.map((order) => (
          <div className="flex items-center " key={order._id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="Avatar" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {order.createdAt}
              </p>
              <p className="text-sm text-muted-foreground">
                {"Payment Status: " + order.paymentStatus}
              </p>
            </div>
            <div className="ml-auto font-medium">{order.total}</div>
          </div>
        ))}
      </div>
    );
  }
