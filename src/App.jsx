import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import HomePage from './pages/HomePage'
import DiamondsPage from './pages/DiamondsPage'
import CollectionsPage from './pages/CollectionsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductDetailPage from './pages/ProductDetailPage'
// Remove ThemeToggle import

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [currentProductId, setCurrentProductId] = useState(null);

  // Make setActivePage available globally for direct navigation from forms
  window.setActivePage = setActivePage;
  window.setProductId = setCurrentProductId;

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCartItems([...cartItems, {...product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  
  const proceedToCheckout = () => {
    setShowCart(false);
    setActivePage('checkout');
  };

  const viewProductDetail = (productId) => {
    setCurrentProductId(productId);
    setActivePage('product-detail');
  };
  
  // Function to render the active page
  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <HomePage addToCart={addToCart} viewProductDetail={viewProductDetail} />;
      case 'diamonds':
        return <DiamondsPage addToCart={addToCart} viewProductDetail={viewProductDetail} />;
      case 'collections':
        return <CollectionsPage addToCart={addToCart} viewProductDetail={viewProductDetail} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'checkout':
        return <CheckoutPage cartItems={cartItems} setActivePage={setActivePage} />;
      case 'product-detail':
        return <ProductDetailPage 
                productId={currentProductId || window.productId} 
                addToCart={addToCart} 
                setActivePage={setActivePage}
               />;
      default:
        return <HomePage addToCart={addToCart} viewProductDetail={viewProductDetail} />;
    }
  };
  
  return (
    <div className="app-container">
      <Header 
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} 
        toggleCart={toggleCart}
        setActivePage={setActivePage}
      />
      
      <main>
        {showCart ? (
          <Cart 
            items={cartItems} 
            removeFromCart={removeFromCart}
            proceedToCheckout={proceedToCheckout}
          />
        ) : (
          renderPage()
        )}
      </main>
      
      <Footer setActivePage={setActivePage} />
    </div>
  )
}

export default App
