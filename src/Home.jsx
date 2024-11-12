import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./front/Header";
import Footer from "./front/Footer";
import WhatsAppButton from "./front/WhatsAppButton";
import ProductGrid from "./front/ProductGrid";
import SearchBar from "./front/SearchBar";
import Cargando from "./front/Cargando";
import PriceFilter from "./front/PriceFilter";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Carusel from "./front/Carusel";
import Disponibles from "./front/Disponibles";
import Select from "@mui/material/Select";
import { Pagination } from "flowbite-react";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(false);
  const [verDisponibles, setVerDisponibles] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 55000]); // Estado para el rango de precios
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [pagina, setPagina] = useState(1);
  const [cantidadItems, setCantidadItems] = useState(0);

  // Lista identificando disponibles
  useEffect(() => {
    axios
      .get(
        "/producto?pagina=" +
          pagina +
          "&searchTerm=" +
          searchTerm +
          "&cantidad=6&categories=" +
          selectedCategoria +
          "&rangoPrecio=" +
          priceRange +
          "&verDisponibles=" +
          verDisponibles
      )
      .then((respuesta) => {
        setLoading(false);
        if (respuesta.status === 200) {
          console.log("respuesta correcta++++", respuesta);
          setData(respuesta.data.data.rows);
          setCantidadItems(respuesta.data.data.count);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        setData([]);
        setCantidadItems(0);
        console.log("error", error);
      });
  }, [verDisponibles, searchTerm, pagina, selectedCategoria, priceRange]);

  // Obtener categorías
  useEffect(() => {
    axios
      .get("/categorias")
      .then((respuesta) => {
        if (respuesta.status === 200) {
          setCategorias(respuesta.data.data);
        } else {
          console.log("error categoria");
        }
      })
      .catch((error) => {
        console.log("error categoria", error);
      });
  }, []);

  // Filtro de categoria
  const handleCategoriaChange = (categoriaId) => {
    setSelectedCategoria(categoriaId);
  };

  // Barra de busqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Función para manejar el cambio de rango de precios
  const handlePriceFilterChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };


  const onPageChange = (page) => setPagina(page);

  return (
    <>
      {/* Header */}
      <div className="p-6 font-bold text-center text-white bg-orange-300">
        <Header />
      </div>

      {/* SearchBar */}
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Carusel */}
      <div>
        <Carusel />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row justify-center m-6">
        {/* Filtros */}
        <div className="md:w-1/5 p-4">
          {" "}
          {/* Ajuste del ancho al 20% */}
          <Box sx={{ minWidth: 120 }} className="mb-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategoria} // Vinculamos el valor al estado local
                label="Categoria"
                onChange={(event) => handleCategoriaChange(event.target.value)} // Controlador del cambio
              >
                <MenuItem value={0}>Todas las categorías</MenuItem>{" "}
                {/* Opción para no filtrar */}
                {categorias.map((categoria, index) => (
                  <MenuItem key={index} value={categoria.idCategorias}>
                    {categoria.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div className="m-3">
            <button
              onClick={() => setVerDisponibles(!verDisponibles)}
              className="p-2 text-white bg-green-400 rounded-md hover:bg-green-500"
            >
              {verDisponibles
                ? "Mostrar no disponibles"
                : "Mostrar disponibles"}
            </button>
          </div>
          <PriceFilter onFilterChange={handlePriceFilterChange} />
        </div>

        {/* Listado de productos*/}
        <div className="md:w-4/5 p-4">
          {" "}
          {/* Ajuste del ancho al 80% */}
          {loading ? (
            <Cargando />
          ) : (
            <ProductGrid
              products={data}
              searchTerm={searchTerm}
              categoria={selectedCategoria}
              disponibles={verDisponibles}
              priceRange={priceRange}
            />
          )}
        </div>
      </div>

      {/* {data && data.length > 0 && (
        <div className="flex my-10 overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={pagina}
            totalPages={parseInt(cantidadItems / 6)}
            onPageChange={onPageChange}
          />
        </div> *
      )}/}

      {/* Botón Flotante WhatsApp */}
      <WhatsAppButton />

      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default Home;
