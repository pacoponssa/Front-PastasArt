// import { useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
 import Logo from "../../src/Logo.png";

const Header = ({ cantidad }) => {
  return (
    <>
      <header className="flex flex-wrap items-center justify-between p-4 bg-gray-100 text-orange-400">
        <nav className="w-full md:w-auto">
          <ul className="flex space-x-8">
            <li>
              <a href="/about" className="hover:text-orange-600">
                Nosotros
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-600">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <a href="/" className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-10 h-10 md:w-14 md:h-14 mr-2 transition ease-in-out delay-150 hover:skew-y-6 hover:scale-110 transform-gpu duration-300"
          />
        </a>
        <div className="relative right-6 mt-2 md:mt-0">
          <a href="/cart" className="hover:text-orange-600">
            Mi carrito
          </a>
          <span className="absolute -top-2 -right-5 bg-orange-600 text-white text-xs rounded-full px-2">
          {cantidad}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
