import React, { useState, useEffect } from 'react';
import './Myprofile.css';

const formatAddress = (address) => {
  const { street, city, state, postalCode } = address;
  return `${street}, ${city}, ${state}, ${postalCode}`;
};

const MyProfile = ({ setCustomer, customer }) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  });

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Fetch customer data from the database when the component mounts or when the customer prop changes
  useEffect(() => {
    setFirstname(customer?.customer?.firstname || '');
    setLastname(customer?.customer?.lastname || '');
    setEmail(customer?.customer?.email || '');
    setPhone(customer?.customer?.phone || '');
    setAddress(customer?.customer?.address || {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    });
  }, [customer]);

  const handleEditClick = (section) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [section]: true,
    }));
  };

  const handleSaveClick = (section) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [section]: false,
    }));

    if (section === 'name' || section === 'lastName') {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        customer: {
          ...prevCustomer.customer,
          firstname,
          lastname,
        },
      }));
    } else if (section === 'email') {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        customer: {
          ...prevCustomer.customer,
          email,
        },
      }));
    } else if (section === 'phone') {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        customer: {
          ...prevCustomer.customer,
          phone,
        },
      }));
    } else if (section === 'address') {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        customer: {
          ...prevCustomer.customer,
          address,
        },
      }));
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">My Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <div className="profile-label">Name:</div>
          <div className="profile-data">
            {isEditing.name ? (
              <>
                <input
                  type="text"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="profile-input"
                />
                <button onClick={() => handleSaveClick('name')} className="profile-button">Save</button>
              </>
            ) : (
              <>
                <div>{firstname}</div>
                <button onClick={() => handleEditClick('name')} className="profile-button">Edit</button>
              </>
            )}
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Last Name:</div>
          <div className="profile-data">
            {isEditing.lastName ? (
              <>
                <input
                  type="text"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  className="profile-input"
                />
                <button onClick={() => handleSaveClick('lastName')} className="profile-button">Save</button>
              </>
            ) : (
              <>
                <div>{lastname}</div>
                <button onClick={() => handleEditClick('lastName')} className="profile-button">Edit</button>
              </>
            )}
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">E-Mail:</div>
          <div className="profile-data">
            {isEditing.email ? (
              <>
                <input
                  type="text"
                  value={email}
                  placeholder="E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                  className="profile-input"
                />
                <button onClick={() => handleSaveClick('email')} className="profile-button">Save</button>
              </>
            ) : (
              <>
                <div>{email}</div>
                <button onClick={() => handleEditClick('email')} className="profile-button">Edit</button>
              </>
            )}
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Phone:</div>
          <div className="profile-data">
            {isEditing.phone ? (
              <>
                <input
                  type="text"
                  value={phone}
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  className="profile-input"
                />
                <button onClick={() => handleSaveClick('phone')} className="profile-button">Save</button>
              </>
            ) : (
              <>
                <div>{phone}</div>
                <button onClick={() => handleEditClick('phone')} className="profile-button">Edit</button>
              </>
            )}
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Address:</div>
          <div className="profile-data">
            {isEditing.address ? (
              <>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  placeholder="Street"
                  onChange={handleAddressChange}
                  className="profile-input"
                />
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  placeholder="City"
                  onChange={handleAddressChange}
                  className="profile-input"
                />
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  placeholder="State"
                  onChange={handleAddressChange}
                  className="profile-input"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  placeholder="Postal Code"
                  onChange={handleAddressChange}
                  className="profile-input"
                />
                <button onClick={() => handleSaveClick('address')} className="profile-button">Save</button>
              </>
            ) : (
              <>
                <div>{formatAddress(address)}</div>
                <button onClick={() => handleEditClick('address')} className="profile-button">Edit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
