
function Listado({items}) {
  // const { items } = props;

  return (
    <>
    
    <div className="p-5">
      {/* Filtros */}     

      {/* Grid de productos en 4 columnas */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-4">
        {items.map((producto) => (
          <div 
            key={producto.idProducto} 
            className="relative group p-3 transition-transform duration-300 bg-white border rounded-lg shadow-lg hover:scale-115"
          >
            {/* Imagen del producto */}
            <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-w-1 aspect-h-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={producto.imagen || "imagen_por_defecto.jpg"}
                alt={producto.nombre}
                className="object-cover object-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg"
              />
            </div>

            {/* Nombre, precio y cantidad */}
            <div className="flex justify-between mt-4">
              <div>
                {/* Nombre del producto */}
                <h3 className="text-lg font-semibold text-gray-800 uppercase">
                  <a href={producto.imagen} className="hover:text-blue-600 hover:font-bold">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {producto.nombre}
                  </a>
                </h3>
                {/* Cantidad con unidad */}
                <p className="mt-1 text-sm text-orange-600">
                  {producto.cantidad} {producto.cantidad > 100 ? 'gs' : 'unid'}
                </p>
              </div>
              <div>
              {/* Precio del producto */}
              <p className="text-lg font-bold text-yellow-600">
                ${producto.precio.toFixed(2)} {/* Formato para mostrar dos decimales */}
              </p> 
              <div>    
              <button
             className="px-1 py-1 bg-orange-500 rounded hover:bg-orange-700 text-white flex item-center justify-center"
             onClick={() => ''}
              >
            <span className="bg-orange-400" title="Cargar en Carrito">🛒</span>
            </button>
            </div>  
            </div>         
            </div>         
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Listado;
