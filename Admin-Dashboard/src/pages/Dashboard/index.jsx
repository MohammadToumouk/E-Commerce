import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import TitleHeadings from "@/components/TitleHeading";
import { Overview } from "@/components/Overview/Overview";
import { Recentorders } from "@/components/RecentOrders/Recentorders";
import { CardDashboard } from "@/components/Card/Card";
import { SearchBar } from "@/components/Searchbar/SearchBar";
import axios from "axios";
import Sidebar from "@/components/Sidebar";


const Dashboard = () => {

  const [customers, setCustomers] = useState([])
  const [sales, setSales] = useState([])
  const [revenueTotal, setRevenueTotal] = useState(0)
  

  useEffect(() => {
    const fetchCustomers = async () => {
      await axios.get('http://localhost:3069/customer', {withCredentials : true})
      .then((response) => {
        setCustomers(response.data)
        console.log(response.data)
      })
    }
    fetchCustomers();
    console.log(customers[0])
  }, [])
  useEffect(() => {
    const fetchSales = async () => {
      await axios.get('http://localhost:3069/order', {withCredentials : true})
      .then((response) => {
        setSales(response.data.orders)
        console.log(response.data)
      })
    }
    fetchSales();
    console.log(sales[0])
  }, [])



  useEffect(() => {
    
    // Calculate total revenue whenever sales data changes
    const totalRevenue = sales?.reduce((total, sale) => {
      return total + (sale.total || 0);
      
    }, 0);
    setRevenueTotal(totalRevenue);
    
    console.log(totalRevenue)
    console.log(revenueTotal)
  }, [sales]);

  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <TitleHeadings
            title="Dashboard"
            subtitle="Welcome to the Dashboard"
          />
          <div className="ml-8 flex items-center space-x-4 mt-10"  >
          <SearchBar />
          </div>
        </div>
        <div className="mt-5 space-y-16">
            <div className="grid ml-4 mr-8 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
              <CardDashboard
                title={"Total Revenue"}
                avatarUrl={"asasd"}
                content={revenueTotal + " €"}
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
                content={sales.length}
                details={"aksddas"}
              />
              <CardDashboard
                title={"Today revenue"}
                avatarUrl={"asasd"}
                content={"0"}
                details={"aksddas"}
              />
            </div>
            <div className="grid gap-4 ml-4 mr-8 p-4 md:grid-cols-2 lg:grid-cols-2">
              <Overview />
              <Recentorders />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
