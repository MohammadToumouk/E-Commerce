import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import axios from "axios";

export function Overview({ paymentIntents }) {
  const [ordersPipeline, setOrdersPipeline] = useState([]);

  useEffect(() => {
    // Process the paymentIntents data to get total orders per month
    const processData = () => {
      const monthsData = {};

      // Loop through paymentIntents and group them by month
      paymentIntents.forEach((intent) => {
        const createdDate = new Date(intent.created * 1000); // Convert UNIX timestamp to Date
        const month = createdDate.getMonth() + 1; // Month is 0-indexed, so add 1
        const year = createdDate.getFullYear();
        const key = `${year}-${month}`;

        if (monthsData[key]) {
          monthsData[key].totalOrders += 1;
        } else {
          monthsData[key] = {
            month: `${year}-${month}`,
            totalOrders: 1,
          };
        }
      });

      // Convert the object to an array of objects
      const processedData = Object.values(monthsData);
      setOrdersPipeline(processedData.reverse());
     /*  console.log(ordersPipeline) */
    };

    processData();
  }, [paymentIntents]);


  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={350}
        className={"shadow-2xl rounded-xl"}
      >
        <BarChart data={ordersPipeline}>
          <XAxis
            dataKey="month"
            stroke="#ffffff"
            fontSize={12}
            tickLine={true}
            axisLine={false}
          />
          <YAxis
            stroke="#ffffff"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="totalOrders" fill="#adfa1d" radius={[10, 10, 15, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
