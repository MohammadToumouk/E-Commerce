import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import TitleHeadings from "@/components/TitleHeading";
import { Overview } from "@/components/Overview/Overview";
import { Recentorders } from "@/components/RecentOrders/Recentorders";
import { CardDashboard } from "@/components/Card/Card";
import { SearchBar } from "@/components/Searchbar/SearchBar";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

//const stripePromise = loadStripe('pk_test_51N2Y22KydIDbyPlEkUYJimKUkEtYf7AJD0ef5XZ5JPRbdJjsrFnKTcgDK0rw3yIT2LJK4LnLzhNXz6NF9VNwGyTn00GEMHCqtJ');
//const secretkey = "sk_test_51N2Y22KydIDbyPlEtk5uN1TDRkv0gMH3o7RiafTXgF2YoUWZUzkp01HhHb6SjTb4qWa77iukwfyMKleYcdDV84xw00TBDzokiB";

const Dashboard = ({ user }) => {
  const [paymentIntents, setPaymentIntents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [dailyAmount, setDailyAmount] = useState(0);
  const [totalcash, setTotalcash] = useState(0);
  const [allOrders, setAllOrders] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    // Calculate total revenue whenever sales data changes
    const totalRevenue = sales?.reduce((total, sale) => {
      return total + (sale.total || 0);
    }, 0);
    setRevenueTotal(totalRevenue);
  }, [sales]);

  useEffect(() => {
    fetchPaymentIntentsFromServer();
  }, [paymentIntents]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3069/customer", {
        withCredentials: true,
      });
      setCustomers(response.data);
      /* console.log(response.data); */
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:3069/order", {
        withCredentials: true,
      });
      setSales(response.data.orders);
      /* console.log(response.data) */;
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const fetchPaymentIntentsFromServer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3069/stripe/checkout/create-checkout-session"
      );
      setPaymentIntents(response.data.paymentIntents.data);
      /* console.log(response.data); */
  
      // Move the calculations inside the try block
      const totalAmount = paymentIntents.reduce((total, intent) => total + intent.amount, 0);
      const totalOrders = paymentIntents.length;
  
      // Calculate daily total
      const today = new Date();
      const todayTotal = paymentIntents.reduce((total, intent) => {
        const createdDate = new Date(intent.created * 1000); // Convert UNIX timestamp to Date
        if (
          createdDate.getDate() === today.getDate() &&
          createdDate.getMonth() === today.getMonth() &&
          createdDate.getFullYear() === today.getFullYear()
        ) {
          return total + intent.amount;
        }
        return total;
      }, 0);
      setDailyAmount(todayTotal/100)
      setTotalcash(totalAmount/100)
      setAllOrders(totalOrders)
  
    /*   console.log("Total Amount is : " + totalAmount); 
      console.log("Total Orders is : " + totalOrders); 
      console.log("Today's Total :" + todayTotal);  */
    } catch (error) {
      console.error("Error fetching payment intents:", error);
    }
  };
  




  
  return (
    <div className="dashboard-container">
      <Sidebar user={user}/>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <TitleHeadings
            title="Dashboard"
            subtitle="Welcome to the Dashboard"
          />
          <div className="ml-8 flex items-center space-x-4 mt-10">
          {/* <SearchBar /> */}
          </div>
        </div>
        <div className="mt-5 space-y-16">
            <div className="grid ml-4 mr-8 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
              <CardDashboard
                title={"Total Revenue"}
                avatarUrl={"asasd"}
                content={totalcash + " €"}
                details={"aksddas"}
              />
              <CardDashboard
                title={"Customers"}
                avatarUrl={"asasd"}
                content={customers.length}
                details={"100% increase"}
              />
              <CardDashboard
                title={"Sales"}
                avatarUrl={"asasd"}
                content={allOrders}
                details={"aksddas"}
              />
              <CardDashboard
                title={"Today revenue"}
                avatarUrl={"asasd"}
                content={dailyAmount + " €"}
                details={"aksddas"}
              />
            </div>
            <div className="grid gap-4 ml-4 mr-8 p-4 md:grid-cols-2 lg:grid-cols-2">
              <Overview  paymentIntents={paymentIntents}/>
              <Recentorders paymentIntents={paymentIntents}  />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard
