import React from 'react';

export default function Header({ cart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', sticky: 'top' }}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>BUILD<span style={{ color: '#facc15' }}>MART</span></div>
      <div style={{ backgroundColor: '#f3f4f6', padding: '10px 20px', borderRadius: '8px', textAlign: 'right' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>CART TOTAL</div>
        <div style={{ fontWeight: 'bold' }}>${totalPrice} ({totalItems} items)</div>
      </div>
    </header>
  );
}