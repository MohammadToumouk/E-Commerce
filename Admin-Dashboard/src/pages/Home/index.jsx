import "./Home.css"

import Navbar from "@/components/Navbar"

const Home = ({user}) => {
  return (
    <div className="home-container">
      <Navbar user={user}/>
      <h1>Home</h1>
    </div>
  )
}

export default Home
