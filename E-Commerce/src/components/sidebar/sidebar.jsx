import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Sidebar = ({ setFilteredProducts, products }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allCategories = [...new Set(products.map((product) => product.category))];
    const allBrands = [...new Set(products.map((product) => product.brand))];

    const colorsSet = new Set();

    products.forEach((product) => {
      if (product.color) {
        if (Array.isArray(product.color)) {
          product.color.forEach((color) => {
            const trimmedColor = color.trim();
            colorsSet.add(trimmedColor);
          });
        } else {
          const colors = product.color.split(',').map((color) => color.trim());
          colors.forEach((color) => {
            colorsSet.add(color);
          });
        }
      }
    });

    setColors([...colorsSet]);
    setSelectedColors([]);
    setCategories(allCategories);
    setBrands(allBrands);
  }, [products]);

  useEffect(() => {
   
    const filteredProducts = products.filter((product) => {
      const isCategoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const isBrandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const isColorMatch =
        selectedColors.length === 0 ||
        (!product.color ||
          (Array.isArray(product.color)
            ? product.color.some((colors) =>
                colors.split(',').map((color) => color.trim()).some((color) => selectedColors.includes(color))
              )
            : selectedColors.includes(product.color.trim())));

      const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      const isSearchMatch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.color &&
          (Array.isArray(product.color)
            ? product.color.some((colors) =>
                colors.split(',').map((color) => color.trim()).some((color) => color.toLowerCase().includes(searchQuery.toLowerCase()))
              )
            : product.color.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return isCategoryMatch && isBrandMatch && isColorMatch && isPriceMatch && isSearchMatch;
    });

    setFilteredProducts(filteredProducts);
  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedColors,
    priceRange,
    searchQuery,
    setFilteredProducts,
  ]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleToggleColorCheckbox = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
      <div>
        <h3>Search</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      {categories.length > 0 && (
        <div>
          <h3>Categories</h3>
          {categories.map((category, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  setSelectedCategories((prevCategories) =>
                    prevCategories.includes(category)
                      ? prevCategories.filter((cat) => cat !== category)
                      : [...prevCategories, category]
                  )
                }
              />
              {category}
            </label>
          ))}
        </div>
      )}

      {brands.length > 0 && (
        <div>
          <h3>Brands</h3>
          {brands.map((brand, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  setSelectedBrands((prevBrands) =>
                    prevBrands.includes(brand)
                    ? prevBrands.filter((b) => b !== brand)
                    : [...prevBrands, brand]
                )
              }
            />
            {brand}
          </label>
        ))}
      </div>
    )}

    {colors.length > 0 && (
      <div>
        <h3>Colors</h3>
        <div className="color-picker">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-option ${selectedColors.includes(color) ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleToggleColorCheckbox(color)}
            ></div>
          ))}
        </div>
      </div>
    )}

    <div>
      <h3>Price Range</h3>
      <div className="ml-2">
      <Box sx={{ width: 170 }}>
        <Slider
          size="large"
          max={5000}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => console.log(`${value}$`) }
        />
      </Box>
      </div>
      <div className="slider-handles">
        <span>€{priceRange[0]}</span>
        <span>€{priceRange[1]}</span>
        </div>

    </div>
  </div>
  );
};

export default Sidebar;

