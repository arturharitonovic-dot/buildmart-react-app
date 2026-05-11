import React from 'react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: "Мужские Кроссовки Nike Blazer Mid '77", price: 12990, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&h=400&auto=format&fit=crop" },
  { id: 2, name: "Мужские Кроссовки Nike Air Max 270", price: 15600, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&h=400&auto=format&fit=crop" },
  { id: 3, name: "Мужские Кроссовки Jordan Air Jordan 1", price: 10700, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=400&h=400&auto=format&fit=crop" },
  { id: 4, name: "Кроссовки Nike Kybrid S2 'What The'", price: 13990, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&h=400&auto=format&fit=crop" },
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Все кроссовки</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-[40px] p-8 transition-all hover:shadow-2xl hover:-translate-y-2">
            <img src={product.img} alt={product.name} className="w-full h-40 object-contain mb-4" />
            <h3 className="text-sm font-medium mb-4 h-10 overflow-hidden">{product.name}</h3>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Цена:</span>
                <span className="font-bold text-sm">{product.price.toLocaleString()} руб.</span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-green-50 text-gray-300 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;