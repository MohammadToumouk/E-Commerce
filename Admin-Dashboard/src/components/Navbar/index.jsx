import './Navbar.css'

import { NavLink } from 'react-router-dom'

const Navbar = ({user}) => {
  return (
    <div className='navbar-container'> 
      <div className='navbar-headerItemContainer'>
        <div className='navbar-leftHeaderItems'>
            <NavLink href='/' className='navbar-logo'>Logo</NavLink>
        </div>
      </div>

      <div className='navbar-headerItemContainer'>
        <div className='navbar-rightHeaderItems'>
        {!user && (
            <NavLink to='/login' className='navbar-redirectButton'>Login</NavLink>
        )}
        </div>
        <div className='navbar-rightHeaderItems'>          
         {user && (
            <NavLink to='/dashboard' className='navbar-dashboardButton'>{"...back to dashboard"}</NavLink>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
