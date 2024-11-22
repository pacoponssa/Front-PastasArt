import { Outlet, Link } from "react-router-dom";
import React from "react";


function LayoutAdmin(){
  return (
    <div className="p-2">
      <nav className="flex justify-center w-full p-4 text-white bg-green-300">
        <div className="mr-4 hover:text-gray-700">
          <Link to="/">Dashboard </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/productoAd">Productos </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/producto/nuevo">Nuevo Producto </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/categorias">Categoria </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/categorias/nuevo">Nueva Categoria </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/cupon">cupon </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/cupon/nuevo">Nuevo Cupon </Link>
        </div>
        <div className="hover:text-gray-700 mr-4">
          <Link to="/admin/comentarios">Comentarios </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;