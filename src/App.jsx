import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

const allProducts = [
  { 
    id: 1, name: 'Exterior Paint Set', price: 45.99, category: 'Paint & Coatings', img: 'https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 3.5,
    description: 'Professional-grade exterior paint set designed to withstand harsh weather conditions. This premium paint offers excellent coverage, durability, and color retention. Perfect for residential and commercial exterior surfaces.',
    specs: { 
      'Volume': '5 gallons total', 
      'Type': '100% Acrylic Latex', 
      'Coverage': '400 sq ft per gallon', 
      'Finish': 'Satin', 
      'Dry Time': '2-4 hours', 
      'Colors': 'Assorted neutral tones' 
    }
  },
  { 
    id: 2, name: 'Plywood Sheets', price: 52.99, category: 'Wood & Lumber', img: 'https://images.unsplash.com/photo-1704167674713-649193461719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHl3b29kJTIwc2hlZXRzJTIwY29uc3RydWN0aW9uJTIwbWF0ZXJpYWx8ZW58MXx8fHwxNzcxMDczNjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.5,
    description: 'Versatile construction-grade plywood sheets suitable for a wide range of applications. These sheets are engineered for strength and dimensional stability, perfect for subfloors, roofing, walls, and general construction.',
    specs: { 
      'Dimensions': "4' x 8'", 
      'Thickness': '3/4 inch', 
      'Grade': 'CDX', 
      'Plies': '7-ply construction', 
      'Exposure': 'Exterior grade', 
      'Veneer': 'Softwood' 
    }
  },
  { 
    id: 3, name: 'Premium Cement Bags', price: 24.99, category: 'Cement & Concrete', img: 'https://images.unsplash.com/photo-1718117075248-3d3c3cd65264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjZW1lbnQlMjBiYWdzJTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3MTE4NDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 5.0,
    description: 'High-quality Portland cement bags designed for heavy-duty construction projects. Our premium cement offers exceptional strength, durability, and workability. Ideal for foundations, structural work, and general concrete applications. Each bag contains precisely measured and tested cement that meets international quality standards.',
    specs: { 
      'Weight': '50 lbs per bag', 
      'Type': 'Portland Cement Type I/II', 
      'Compressive Strength': '3500 PSI at 28 days', 
      'Setting Time': '2-4 hours initial set', 
      'Coverage': 'Approximately 0.45 cubic feet', 
      'Storage Life': '6 months in sealed bag' 
    }
  },
  { 
    id: 4, name: 'Premium Lumber Planks', price: 89.99, category: 'Wood & Lumber', img: 'https://images.unsplash.com/photo-1764025390519-1ccc15d719a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMG1hdGVyaWFscyUyMHdvb2QlMjBsdW1iZXIlMjBwbGFua3N8ZW58MXx8fHwxNzcxMTg1MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.5,
    description: 'Premium kiln-dried lumber planks perfect for all your woodworking and construction needs. These high-grade wooden planks are carefully selected for strength and appearance. Suitable for framing, decking, furniture making, and various carpentry projects.',
    specs: { 
      'Dimensions': '2" x 6" x 8\'', 
      'Wood Type': 'Douglas Fir', 
      'Grade': 'Premium Select', 
      'Moisture Content': '15% kiln-dried', 
      'Treatment': 'Pressure-treated option available', 
      'Quantity': 'Sold individually' 
    }
  },
  { 
    id: 5, name: 'Red Clay Bricks', price: 0.89, category: 'Bricks & Stones', img: 'https://images.unsplash.com/photo-1761358270922-5a4df4ab9782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBicmlja3MlMjByZWQlMjBzdGFja3xlbnwxfHx8fDE3NzExODUyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 4.0,
    description: 'Traditional red clay bricks manufactured to the highest standards. These durable bricks are perfect for walls, patios, pathways, and architectural features. Fire-hardened for exceptional strength and weather resistance.',
    specs: { 
      'Dimensions': '8" x 4" x 2.25"', 
      'Material': 'Fire-hardened clay', 
      'Compressive Strength': '3000+ PSI', 
      'Water Absorption': 'Less than 8%', 
      'Color': 'Classic red', 
      'Weight': '4.5 lbs per brick' 
    }
  },
  { 
    id: 6, name: 'Steel I-Beams', price: 349.99, category: 'Steel & Metals', img: 'https://images.unsplash.com/photo-1707236527163-bd3478178466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMGJlYW1zJTIwY29uc3RydWN0aW9uJTIwbWV0YWx8ZW58MXx8fHwxNzcxMTg1MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', rating: 5.0,
    description: 'Heavy-duty structural steel I-beams engineered for maximum load-bearing capacity. These professional-grade beams are essential for large construction projects, building frames, and structural support applications.',
    specs: { 
      'Length': '20 feet', 
      'Profile': 'W10x49', 
      'Material': 'ASTM A992 Grade 50 Steel', 
      'Weight': '980 lbs', 
      'Yield Strength': '50 ksi', 
      'Finish': 'Mill finish' 
    }
  },
];

const RenderStars = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`}>⭐</span>);
  }
  if (hasHalfStar) {
    stars.push(<span key="half" className="half-star">⭐</span>);
  }
  return (
    <div className="rating">
      {stars} 
      <span className="rating-num">({rating.toFixed(1)})</span>
    </div>
  );
};

const ProductCard = ({ p, addToCart }) => (
  <div className="product-card">
    <Link to={`/product/${p.id}`} className="product-card-link">
      <img src={p.img} alt={p.name} className="product-image" />
    </Link>
    <div className="product-info">
      <p className="category">{p.category}</p>
      <RenderStars rating={p.rating} />
      <Link to={`/product/${p.id}`} className="product-title-link">
        <h3>{p.name}</h3>
      </Link>
      <div className="price-row">
        <span className="price">${p.price}</span>
        <button onClick={() => addToCart(p)} className="add-btn">Add to Cart</button>
      </div>
    </div>
  </div>
);

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  
  const gallery = [product?.img, product?.img, product?.img];

  if (!product) return <div className="container">Product not found</div>;

  const nextImg = () => setActiveImg(prev => (prev === gallery.length - 1 ? 0 : prev + 1));
  const prevImg = () => setActiveImg(prev => (prev === 0 ? gallery.length - 1 : prev - 1));

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/">Products</Link> / <span>{product.name}</span>
      </nav>

      <div className="product-page-grid">
        <div className="product-gallery">
          <div className="main-img-holder">
            <button className="gallery-nav prev" onClick={prevImg}>‹</button>
            <img src={gallery[activeImg]} alt={product.name} />
            <button className="gallery-nav next" onClick={nextImg}>›</button>
          </div>
          <div className="thumb-row">
            {gallery.map((img, index) => (
              <div 
                key={index} 
                className={`thumb-box ${activeImg === index ? 'active' : ''}`}
                onClick={() => setActiveImg(index)}
              >
                <img src={img} alt="preview" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-details">
          <h1>{product.name}</h1>
          <RenderStars rating={product.rating} />
          <div className="big-price">${product.price} <small>/ unit</small></div>
          
          <div className="utility-badges">
            <div className="u-badge"><span>🛡️</span> Quality Material</div>
            <div className="u-badge"><span>🚚</span> Fast Delivery</div>
            <div className="u-badge"><span>✅</span> Warranty</div>
          </div>

          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="qty-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => addToCart({...product, quantity})} className="add-btn large">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          <div className="description-section">
            <h4>Description</h4>
            <p className="description">{product.description}</p>
          </div>

          <div className="specs-card">
            <div className="specs-header" onClick={() => setShowSpecs(!showSpecs)}>
              <h4>Technical Specifications</h4>
              <span className="toggle-icon">{showSpecs ? '▲' : '▼'}</span>
            </div>
            {showSpecs && (
              <div className="specs-grid">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div className="spec-item" key={key}>
                    <label>{key}</label>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} p={p} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ cartCount }) => (
  <header className="header">
    <div className="header-container">
      <Link className="logo" to="/">
        <div className="logo-icon">BM</div> BuildMart
      </Link>
      <nav className="nav">
        <Link to="/">Products</Link>
        <a href="#">Categories</a>
        <a href="#">Deals</a>
        <a href="#">About</a>
      </nav>
      <div className="header-actions">
        <input type="text" placeholder="Search products..." className="search-input" />
        <Link to="/cart" className="cart-link">
          <span className="cart-icon-img">🛒</span>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <div className="logo white">
          <div className="logo-icon">BM</div> BuildMart
        </div>
        <p>Premium construction supplies for all your projects.</p>
        <div className="social-links">
          <span>f</span> <span>t</span> <span>in</span>
        </div>
      </div>
      <div className="footer-links">
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Products</li>
            <li>Delivery Info</li>
            <li>Returns Policy</li>
          </ul>
        </div>
        <div>
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping & Tracking</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for updates and exclusive tools.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Your email" />
            <button>→</button>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-container">
        <p>Phone: 1-800-BUILD-MART</p>
        <p>Email: support@buildmart.com</p>
        <p>Address: 123 Construction Ave, Builder City, BC 12345</p>
      </div>
      <div className="footer-copyright">© 2026 BuildMart. All rights reserved.</div>
    </div>
  </footer>
);

const CatalogPage = ({ addToCart }) => {
  const [sortType, setSortType] = useState('name'); 
  const [showFilters, setShowFilters] = useState(false); 
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

  const clearFilters = () => {
    setMinRating(0);
    setMinPrice(0);
    setMaxPrice(400);
    setSortType('name');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let items = allProducts.filter(p => 
      p.rating >= minRating && 
      p.price >= minPrice && 
      p.price <= maxPrice
    );
    
    if (sortType === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'priceLow') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHigh') {
      items.sort((a, b) => b.price - a.price);
    }
    return items;
  }, [sortType, minRating, minPrice, maxPrice]);

  return (
    <div className="container">
      <section className="hero">
        <h1>Building Materials</h1>
        <p>Premium construction supplies for all your projects</p>
        
        <div className="filter-controls-bar">
          <div className="filter-left">
            <button className="toggle-filters-btn" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <span className="results-count">Showing {filteredAndSortedProducts.length} products</span>
          </div>
          <div className="sort-container">
            <label>Sort by:</label>
            <select className="sort-select" value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="name">Name (A-Z)</option>
              <option value="priceLow">Price (Low to High)</option>
              <option value="priceHigh">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <h4>Minimum Rating</h4>
              <div className="rating-options">
                <label className="checkbox-label">
                  <input type="radio" name="rating" checked={minRating === 0} onChange={() => setMinRating(0)} />
                  All
                </label>
                {[5, 4, 3].map(star => (
                  <label key={star} className="checkbox-label">
                    <input type="radio" name="rating" checked={minRating === star} onChange={() => setMinRating(star)} />
                    {star}+ Stars
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <div 
                className="dual-range-slider"
                style={{
                  background: `linear-gradient(to right, #E5E7EB ${minPrice/4}% , #101828 ${minPrice/4}% ${maxPrice/4}%, #E5E7EB ${maxPrice/4}%)`
                }}
              >
                <input 
                  type="range" min="0" max="400" value={minPrice} 
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))}
                  className="range-input"
                />
                <input 
                  type="range" min="0" max="400" value={maxPrice} 
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
                  className="range-input"
                />
              </div>
              <div className="price-labels">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
            <button className="clear-filters-btn" onClick={clearFilters}>Clear All Filters</button>
          </div>
        )}
      </section>

      <div className="product-grid">
        {filteredAndSortedProducts.map(p => (
          <ProductCard key={p.id} p={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

const CartPage = ({ cartItems, updateQuantity, removeItem }) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleApplyPromo = () => {
    if (promoInput.trim() === 'SAVE10') {
      const calculatedDiscount = subtotal * 0.1;
      setDiscount(calculatedDiscount);
      setPromoMessage({ text: 'Promo code applied! You saved 10%', type: 'success' });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid promo code', type: 'error' });
    }
  };

  // Налог теперь всегда считается от подытога (не уменьшается при скидке)
  const tax = subtotal * 0.08;
  const total = subtotal - discount + tax;

  return (
    <div className="container">
      <h2 className="page-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <span className="empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <Link to="/" className="browse-btn">Browse Products</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-main-content">
            <div className="cart-items-list">
              <div className="cart-header-row">
                <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <img src={item.img} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <span className="item-price-cell">${item.price}</span>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <div className="item-total-cell">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="remove-item-btn" onClick={() => removeItem(item.id)} title="Remove Item">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="promo-section">
              <h4>Have a Promo Code?</h4>
              <div className="promo-input-group">
                <input 
                  type="text" 
                  placeholder="Enter code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="promo-input"
                />
                <button onClick={handleApplyPromo} className="apply-promo-btn">Apply</button>
              </div>
              {promoMessage.text && (
                <p className={`promo-message ${promoMessage.type}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>
          </div>
          
          <div className="cart-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>

            <div className="shipping-info-card">
              <h3>Shipping Information</h3>
              <div className="shipping-details">
                <p><strong>Standard Shipping:</strong> 3-5 business days</p>
                <p><strong>Express Shipping:</strong> 1-2 business days</p>
                <p className="shipping-note">Shipping costs will be calculated at checkout based on your address.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
    
    setToast({ visible: true, message: `Added ${product.name} to cart` });
    setTimeout(() => setToast({ visible: false, message: '' }), 2000);
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        {toast.visible && <div className="toast-popup">{toast.message}</div>}
        <Header cartCount={totalCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CatalogPage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}