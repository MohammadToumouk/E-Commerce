import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL

export function Overview() {
  const [ordersPipeline, setOrdersPipeline] = useState([]);
  const [monthName, setMonthName] = useState();
  const [totalOrders, setTotalOrders] = useState();

  useEffect(() => {
    const fetchOrdersByMonth = async () => {
      await axios
        .get(baseUrl + "/api/order/sort", { withCredentials: true })
        .then((response) => {
          setOrdersPipeline(response.data);
          for (let i = 0; i < ordersPipeline.length; i++) {
            setMonthName(ordersPipeline[i].month);
            
            switch (monthName) {
              case 1:
                setMonthName("January");
                break;
              case 2:
                setMonthName("February");
                
                break;
              case 3:
                setMonthName("March");
                break;
              case 4:
                setMonthName("April");;
                break;
              case 5:
                setMonthName("May");
                break;
              case 6:
                setMonthName("June");
                break;
              case 7:
                setMonthName("July");
                break;
              case 8:
                setMonthName("August");
                break;
              case 9:
                setMonthName("September");
                break;
              case 10:
                setMonthName("October");
                break;
              case 11:
                setMonthName("November");
                break;
              case 12:
                setMonthName("December");
                break;
              default:
                setMonthName("Unknown");
                break;
            }
            console.log("haha " + monthName)
          }
          console.log(ordersPipeline);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchOrdersByMonth();
  }, []);

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
