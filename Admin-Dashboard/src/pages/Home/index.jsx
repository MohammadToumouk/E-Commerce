import CreateStorePage from "../CreateStorePage"
import "./Home.css"

import Navbar from "@/components/Navbar"


const Home = ({user}) => {
  return (
    <div className="home-container">
      <Navbar user={user}/>
      <h1 className="home-title">Admin Dashboard</h1>
      <h2 className="home-subtitle">Welcome to a new way of integrating and managing all your stores with our services.</h2>
      <h2 className="home-subtitle">Enjoy the EMAzing journey.</h2>     

    </div>
  )
}

export default Home
