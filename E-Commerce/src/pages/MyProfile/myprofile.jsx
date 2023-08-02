import React, { useState} from 'react';
import './Myprofile.css'


const initialProfileItems = [
  { label: 'Name', value: 'John', isEditing: false },
  { label: 'Last Name', value: 'Doe', isEditing: false },
  { label: 'Email', value: 'john.doe@example.com', isEditing: false },
  { label: 'Phone', value: '123-456-7890', isEditing: false },
  {
    label: 'Address',
    value: { street: '123 Main Street', city: 'Detroit', state: 'USA', postalCode: '' },
    isEditing: false,
  },
];

const formatAddress = (address) => {
  const { street, city, state, postalCode } = address;
  return `${street}, ${city}, ${state}, ${postalCode}`;
};

const MyProfile = ({setCustomer, customer}) => {
  const [profileItems, setProfileItems] = useState(initialProfileItems);
  const [firstname, setFirstname] = useState(customer?.customer?.firstname)
  const [lastname, setLastname] = useState(customer?.customer?.lastname)
  const [email, setEmail] = useState(customer?.customer?.email)
  const [phone, setPhone] = useState(customer?.customer?.phone)
  const [address, setAddress] = useState(customer?.customer?.address)
  const [city, setCity] = useState(customer?.customer?.city)
  const [state, setState] = useState(customer?.customer?.state)
  const [postalCode, setPostalCode] = useState(customer?.customer?.postalCode)
  const [isEditing, setIsEditing] = useState(false)

  
  console.log("customer:", customer)

  const handleEditClick = (index) => {
    setProfileItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].isEditing = true;
      return updatedItems;
    });
  };

  const handleSaveClick = (index) => {
    setProfileItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].isEditing = false;
      return updatedItems;
    });
  };


{/* <---emi-start---> */}
  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label>Name:</label>
          <div>
          <input
              type="text"
              value={firstname}
              placeholder="First Name"
              onChange={(e) => { setFirstname(e.target.value) }}
              className="profile-input"
            />
          </div>
        </div>
        <div className="profile-item">
          <label>Last Name:</label>
          <div>
          <input
              type="text"
              value={lastname}
              placeholder="Last Name"
              onChange={(e) => { setLastname(e.target.value) }}
              className="profile-input"
            />
          </div>
        </div>
        <div className="profile-item">
          <label>E-Mail:</label>
          <div>
          <input
              type="text"
              value={email}
              placeholder="E-Mail"
              onChange={(e) => { setEmail(e.target.value) }}
              className="profile-input"
            />
          </div>
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          <div>
          <input
              type="text"
              value={phone}
              placeholder="Phone Number"
              onChange={(e) => { setPhone(e.target.value) }}
              className="profile-input"
            />
          </div>
        </div>
{/* <---emi-end---> */}

        {profileItems.map((item, index) => (
          <div className="profile-item" key={index}>
            <label>{item.label}:</label>
            {item.isEditing ? (
              item.label === 'Address' ? (
                <div>
                  <input
                    type="text"
                    value={item.value.street}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setProfileItems((prevItems) => {
                        const updatedItems = [...prevItems];
                        updatedItems[index].value.street = newValue;
                        return updatedItems;
                      });
                    }}
                    placeholder="Enter your Street"
                  />
                  <input
                    type="text"
                    value={item.value.city}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setProfileItems((prevItems) => {
                        const updatedItems = [...prevItems];
                        updatedItems[index].value.city = newValue;
                        return updatedItems;
                      });
                    }}
                    placeholder="Enter your City"
                  />
                  <input
                    type="text"
                    value={item.value.state}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setProfileItems((prevItems) => {
                        const updatedItems = [...prevItems];
                        updatedItems[index].value.state = newValue;
                        return updatedItems;
                      });
                    }}
                    placeholder="Enter your State"
                  />
                  <input
                    type="text"
                    value={item.value.postalCode}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setProfileItems((prevItems) => {
                        const updatedItems = [...prevItems];
                        updatedItems[index].value.postalCode = newValue;
                        return updatedItems;
                      });
                    }}
                    placeholder="Enter your postal code"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setProfileItems((prevItems) => {
                      const updatedItems = [...prevItems];
                      updatedItems[index].value = newValue;
                      return updatedItems;
                    });
                  }}
                />
              )
            ) : (
              <span>
                {item.label === 'Address' ? formatAddress(item.value) : item.value}
              </span>
            )}
            {item.isEditing ? (
              <button onClick={() => handleSaveClick(index)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(index)}>🖉</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
