import React from 'react'
import "./Auth.css";
import Register from './Register';
import Login from './Login';
import { NavLink } from 'react-router-dom';

const Auth = ({routeTo}) => {
  return (
    <div className="auth-container">
        <div className='auth-left-container'>
            <div className='auth-left-content'>
                <NavLink to="/" className='auth-logo'>Logo</NavLink>
                {routeTo === 'login' ? <h1 className='auth-quote'>“A well-designed dashboard is like a compass that guides decision-makers through the vast sea of data, leading them to the shores of meaningful insights.”</h1>
                : 
                <h1 className="auth-quote">“Behind this login lies a world of transformative intelligence, where data becomes the key to unlocking your organization's true potential.”</h1>}
            </div>
        </div>
        <div className='auth-right-container'>
            <div className='auth-right-content'>
                {routeTo === 'login' ? <Login /> : <Register /> }
            </div>
        </div>
    </div>
  )
}

export default Auth
