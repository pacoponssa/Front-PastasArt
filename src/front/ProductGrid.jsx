
import ProductCard from './ProductCard';


const ProductGrid = ({ products, searchTerm, categoria, disponibles, priceRange }) => {
  const categoriaInt = typeof categoria === 'string' ? parseInt(categoria, 10) : categoria; // Convertimos la categoría a entero

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
      {products
          .map(product => (
         <ProductCard key={product.idProducto} product={product} />
        ))
      }
    </div>
  );
};

export default ProductGrid;