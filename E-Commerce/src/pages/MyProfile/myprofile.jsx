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

const MyProfile = () => {
  const [profileItems, setProfileItems] = useState(initialProfileItems);

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

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
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
