import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/footer.css';

const Footer = () => {
    
    return (
      
        <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 EMAzing Shopping. All rights reserved.</p>
          <nav className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    )
}

export default Footer;