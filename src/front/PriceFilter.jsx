import React, { useState } from "react";
import { Slider, Typography, Box, Button } from "@mui/material";
import { Diversity3 } from "@mui/icons-material";

const PriceFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([1000, 55000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleApplyFilters = () => {
    onFilterChange(priceRange); // Se llama a la función de cambio de filtro con el nuevo rango de precios
  };

  const handleResetFilters = () => {
    setPriceRange([1000, 55000]);
    onFilterChange([1000, 55000]); // Resetea el rango de precios a su valor original
  };

  return (
    <Box sx={{ width: "90%", margin: "20px 0" }}>
      <Typography variant="h6" gutterBottom>
        Filtrar por precio
      </Typography>
      <Slider
  value={priceRange}
  onChange={handlePriceChange}
  valueLabelDisplay="auto"
  min={1000}
  max={55000}
  step={500}
  sx={{
    marginBottom: 2,
    color: "orange", // Color del valor seleccionado
    "& .MuiSlider-thumb": {
      backgroundColor: "orange", // Color de los controles
    },
    "& .MuiSlider-rail": {
      backgroundColor: "green", // Color del riel
    },
  }}
/>
      <Box display="flex" justifyContent="space-between">
        <Typography>${priceRange[0]}</Typography>
        <Typography>${priceRange[1]}</Typography>
      </Box>
      <div className="flex justify-between mt-3 gap-x-4">
  <button
    className="w-full px-2 py-2 h-9 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300 ease-in-out"
    onClick={handleResetFilters}
  >
    Restablecer
  </button>
  <button
    className="w-full px-2 py-2 h-9 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-300 ease-in-out"
    onClick={handleApplyFilters}
  >
    Aplicar filtros
  </button>
</div>

    </Box>
  );
};

export default PriceFilter;
