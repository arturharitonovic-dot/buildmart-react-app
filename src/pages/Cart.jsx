import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  return (
    <div className="max-w-[1000px] mx-auto p-10 bg-white rounded-3xl shadow-xl mt-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Корзина</h1>
        <Link to="/" className="text-blue-500 hover:underline">← Вернуться к покупкам</Link>
      </div>

      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4 justify-between">
              <div className="flex items-center gap-4">
                <img src={item.img} className="w-20 h-20 object-contain" alt="" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400">{item.price} руб.</p>
                </div>
              </div>
              <b className="text-lg">{item.count} шт.</b>
            </div>
          ))}
          <div className="mt-10 text-right">
            <p className="text-2xl font-bold">Итого: {totalPrice.toLocaleString()} руб.</p>
            <button className="mt-4 bg-green-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-600">
              Оформить заказ
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400">В корзине пока ничего нет</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;