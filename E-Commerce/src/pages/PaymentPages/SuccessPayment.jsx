import React from 'react';

export const SuccessPayment = () => {
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '20px',
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>Thank you for shopping at our EMAzing Store</h2>
      <a href="/shop" style={buttonStyle}>Go to Shop</a>
    </div>
  );
};
