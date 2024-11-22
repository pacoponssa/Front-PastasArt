import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import Home from './Home';
import LayoutAdmin from './admin/LayoutAdmin';
import Dashboard from './admin/Dashboard.jsx';
import ProductosIndex from './admin/productos/index';
import FormularioProducto from './admin/productos/formProducto.jsx';
import CategoriaIndex from './admin/categorias/index.jsx';
import FormularioCategoria from './admin/categorias/formCategoria.jsx';
import ImagenesIndex from './admin/imagenes/index';
import FormularioImagen from './admin/imagenes/formImagen.jsx';
import CarritoIndex from './admin/carritos/index.jsx';
import FormularioCarrito from './admin/carritos/formCarrito.jsx';
import CuponIndex from './admin/cupones/index.jsx';
import FormularioCupon from './admin/cupones/formCupon.jsx';
// +++++++++
import ProductDetail from './admin/productos/ProductDetail.jsx';
// +++++++++
import ComentariosIndex from './admin/comentarios/index.js';

import './index.css';


axios.defaults.baseURL = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home />,
  },
  {
    path: "/producto/descripcion/:idProducto",
    element:<ProductDetail />
  },
  {
    path: "/admin",
    exact: true,
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      // {
      //   path: "producto",
      //   element: <ProductosIndex />,
      // },
      {
        path: "productoAd",
        element: <ProductosIndex />,
      },
      {
        path: "producto/:id",
        element: <FormularioProducto />,
      },
      {
        path: "cupon",
        element: <CuponIndex />,
      },
      {
        path: "categorias",
        element: <CategoriaIndex />,
      },
      {
        path: "categorias/:id",
        element: <FormularioCategoria />,
      },
      {
        path: "imagen",
        element: <ImagenesIndex />,
      },
      {
        path: "imagen/prod/:id",
        element: <FormularioImagen />,
      },     
      {
        path: "carrito",
        element: <CarritoIndex />,
      },
      {
        path: "carrito/:id",
        element: <FormularioCarrito />,
      },      
      {
        path: "cupon/:id",
        element: <FormularioCupon />,
      },
      {
        path: "comentarios",
        element: <ComentariosIndex />,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


// reportWebVitals();
