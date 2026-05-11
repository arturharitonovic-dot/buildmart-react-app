import React from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';

const CartModal = ({ onClose }) => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex justify-end">
      <div className="bg-white w-[385px] h-full p-8 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Корзина</h2>
          <X onClick={onClose} className="cursor-pointer text-gray-300 hover:text-black" size={32} />
        </div>

        {cart.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border border-gray-100 rounded-2xl p-4 mb-4">
                  <img src={item.img} className="w-16 h-16 object-contain mr-4" alt="" />
                  <div className="flex-1">
                    <p className="text-sm">{item.name}</p>
                    <b className="text-sm">{item.price} руб.</b>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-4">
                <span>Итого:</span>
                <div className="flex-1 border-b border-dashed border-gray-200 mx-2 mb-1"></div>
                <b>{totalPrice} руб.</b>
              </div>
              <button className="w-full bg-[#9DD458] text-white py-4 rounded-2xl font-bold hover:bg-[#8ec44d] transition-colors">
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400">Корзина пустая</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;