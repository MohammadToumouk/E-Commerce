import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ setFilteredProducts, products }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [names, setNames] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  // Fetch data from the API and set filter options
  useEffect(() => {
    if (products.length > 0) {
      setCategories([...new Set(products.map((product) => product.category))]);

      const uniqueBrands = [...new Set(products.map((product) => product.brand))].filter(Boolean);
      setBrands(uniqueBrands);

      const uniqueNames = [...new Set(products.map((product) => product.name))].filter(Boolean);
      setNames(uniqueNames);

      const uniqueSizes = [...new Set(products.flatMap((product) => product.size))].filter(Boolean);
      setSizes(uniqueSizes);

      const uniqueColors = [...new Set(products.flatMap((product) => product.color))].filter(Boolean);
      setColors(uniqueColors);

      // Adjust price range based on the min and max values in the API
      const minPrice = Math.min(...products.map((product) => product.price));
      const maxPrice = Math.max(...products.map((product) => product.price));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  // Filter logic
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const isBrandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const isNameMatch = selectedNames.length === 0 || selectedNames.includes(product.name);
      const isSizeMatch = selectedSizes.length === 0 || selectedSizes.some((size) => product.size.includes(size));
      const isColorMatch = selectedColors.length === 0 || selectedColors.some((color) => product.color.includes(color));
      const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      return isCategoryMatch && isBrandMatch && isNameMatch && isSizeMatch && isColorMatch && isPriceMatch;
    });

    setFilteredProducts(filteredProducts);
  }, [products, selectedCategories, selectedBrands, selectedNames, selectedSizes, selectedColors, priceRange, setFilteredProducts]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
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
                    prevBrands.includes(brand) ? prevBrands.filter((b) => b !== brand) : [...prevBrands, brand]
                  )
                }
              />
              {brand}
            </label>
          ))}
        </div>
      )}

      {names.length > 0 && (
        <div>
          <h3>Names</h3>
          {names.map((name, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedNames.includes(name)}
                onChange={() =>
                  setSelectedNames((prevNames) =>
                    prevNames.includes(name) ? prevNames.filter((n) => n !== name) : [...prevNames, name]
                  )
                }
              />
              {name}
            </label>
          ))}
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <h3>Sizes</h3>
          {sizes.map((size, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() =>
                  setSelectedSizes((prevSizes) =>
                    prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
                  )
                }
              />
              {size}
            </label>
          ))}
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3>Colors</h3>
          {colors.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() =>
                  setSelectedColors((prevColors) =>
                    prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
                  )
                }
              />
              {color}
            </label>
          ))}
        </div>
      )}

      {priceRange.length > 0 && (
        <div>
          <h3>Price Range</h3>
          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <span>{`€${priceRange[0]} - €${priceRange[1]}`}</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
