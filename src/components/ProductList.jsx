import React from 'react';
import { products } from '../data';

export default function ProductList({ onAddToCart }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '20px' }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #eee', padding: '20px', display: 'flex', flexDirection: 'column', borderRadius: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase' }}>{product.category}</span>
          <h3 style={{ margin: '10px 0 5px 0' }}>{product.name}</h3>
          <div style={{ color: '#facc15', marginBottom: '15px' }}>
            {"★".repeat(Math.floor(product.rating))}
            <span style={{ color: '#ccc' }}>{"★".repeat(5 - Math.floor(product.rating))}</span>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '900' }}>${product.price}</span>
            <button 
              onClick={() => onAddToCart(product)}
              style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}