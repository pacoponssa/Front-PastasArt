import { Link } from "react-router-dom";

const ProductCard = ({ product, descuento = 0 }) => {
  // Calcular el precio con descuento
  const precioConDescuento = descuento
    ? (product.precio - (product.precio * descuento) / 100).toFixed(2)
    : null;

  return (
    <Link
      to={`producto/descripcion/${product.idProducto}`}
      className="w-full border p-4 rounded-lg shadow-lg group transition-transform duration-300 hover:shadow-xl bg-gray-100"
    >
      {/* Contenedor de la imagen */}
      <div className="w-full h-48 overflow-hidden rounded-md">
        <img
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={product.imagen}
          alt={product.nombre}
        />
      </div>

      {/* Nombre del producto */}
      <h3
        className="text-lg font-semibold mt-2 text-gray-800
       group-hover:text-orange-600 transition-colors duration-300 line-clamp-1 hover:line-clamp-3 overflow-hidden"
      >
        {product.nombre}
      </h3>

      {/* Precio del producto y botón de carrito */}
      <div className="flex justify-between items-center mt-2">
        <div>
          {descuento > 0 ? (
            <div>
              Precio original tachado
              <p className="text-gray-400 line-through text-sm">
                $ {product.precio.toFixed(2)}
              </p>
              {/* Precio con descuento */}
              <p className="text-orange-600 font-bold">
                $ {precioConDescuento}
              </p>
            </div>
          ) : (
            // Precio normal
            <p className="text-gray-500">$ {product.precio.toFixed(2)}</p>
          )}
        </div>

        {/* caracteristicas */}
        <div className="mt-4">
          {product.caracteristicas && (
            <div className="p-3 mb-4 bg-gray-100 rounded-lg border">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">
                Características:
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {product.caracteristicas.split("|").map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* especificaciines */}
          {product.especificaciones && (
            <div className="p-3 bg-gray-100 rounded-lg border">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">
                Especificaciones:
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {product.especificaciones.split("|").map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className="px-3 py-2 bg-orange-500 rounded-md hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-300"
          onClick={() => ""} // Lógica del carrito
        >
          <i className="fas fa-shopping-cart" title="Cargar en Carrito"></i>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
