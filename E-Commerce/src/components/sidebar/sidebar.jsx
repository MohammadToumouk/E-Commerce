import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

 
  const categories = ['Mobile Phones', 'Tablets',];
  const brands = ['Apple', 'Samsung', 'Huawei',];
  const names = ['iPhone 13', 'iPhone 14', 'Samsung S23',];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', ];
  const colors = ['Blue', 'Green', 'Black', 'Purple', 'Orange',];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((item) => item !== brand)
        : [...prevSelected, brand]
    );
  };

  const handleNameChange = (name) => {
    setSelectedNames((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((item) => item !== size)
        : [...prevSelected, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(color)
        ? prevSelected.filter((item) => item !== color)
        : [...prevSelected, color]
    );
  };

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
      <button className="sidebar-toggle" onClick={handleToggleSidebar}>
        ☰
      </button>

      <div>
        <h3>Categories</h3>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <div>
        <h3>Brands</h3>
        {brands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div>
        <h3>Names</h3>
        {names.map((name) => (
          <label key={name}>
            <input
              type="checkbox"
              checked={selectedNames.includes(name)}
              onChange={() => handleNameChange(name)}
            />
            {name}
          </label>
        ))}
      </div>

      <div>
        <h3>Sizes</h3>
        {sizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            {size}
          </label>
        ))}
      </div>

      <div>
        <h3>Colors</h3>
        {colors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
            {color}
          </label>
        ))}
      </div>

      <div>
        <h3>Price Range</h3>
        <input
          type="range"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange([priceRange[0], e.target.value])}
          min={0}
          max={5000}
        />
        {priceRange[0]} - {priceRange[1]}
      </div>
    </div>
  );
};

export default Sidebar;
