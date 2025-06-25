const ProductCard = ({ product, onQuickView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-gray-800 font-bold mb-4">${product.price}</p>
        <button
          onClick={() => onQuickView(product)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;