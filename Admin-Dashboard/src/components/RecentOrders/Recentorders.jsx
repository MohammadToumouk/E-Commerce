import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import './index.css'

  export function Recentorders({paymentIntents }) {
    const [orders, setOrders] = useState([]);

   

    return (
      <div className="space-y-4 shadow-2xl p-4 rounded-xl max-h-[350px]  overflow-scroll overscroll-x-none">
        <p className="text-lg">Recent Orders</p>
        {paymentIntents .map((intent) => (
          <div className="flex items-center " key={intent.id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="Avatar" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {"Product ID : " + intent.id}
              </p>
              <p className="text-sm text-muted-foreground">
                {"Payment Method: " + intent.payment_method_types}
              </p>
            </div>
            <div className="ml-auto font-medium">{"Total : " + intent.amount/100 + " €"}</div>
          </div>
        ))}
      </div>
    );
  }
