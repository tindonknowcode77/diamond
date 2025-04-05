import React, { useState, useEffect, useRef } from 'react';
import { diamondProducts } from '../data/products';
import SearchResults from './SearchResults';

const Header = ({ cartItemCount, toggleCart, setActivePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      
      if (showMegaMenu && !event.target.closest('.nav-menu')) {
        setShowMegaMenu(false);
        setActiveMegaMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMegaMenu]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setShowSearchResults(false);
      return;
    }

    const results = performSearch(searchQuery);
    setSearchResults(results);
    setShowSearchResults(true);
    console.log('Searching for:', searchQuery, 'Results:', results.length);
  };

  const performSearch = (query) => {
    // More sophisticated search with better matching
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    
    return diamondProducts.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.type} ${product.color} ${product.clarity} ${product.carats}`.toLowerCase();
      
      // Check if any search term is found in the searchable text
      return searchTerms.some(term => searchableText.includes(term));
    }).sort((a, b) => {
      // Sort by relevance - exact matches first
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (bNameMatch && !aNameMatch) return 1;
      return 0;
    });
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto-search after typing at least 2 characters
    if (value.trim() === '' || value.length < 2) {
      setShowSearchResults(false);
    } else {
      const results = performSearch(value);
      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  const handleSearchResultClick = (productId) => {
    setSearchQuery('');
    setShowSearchResults(false);
    window.productId = productId;
    setActivePage('product-detail');
  };

  const toggleMegaMenu = (category) => {
    if (activeMegaMenu === category) {
      setShowMegaMenu(false);
      setActiveMegaMenu(null);
    } else {
      setShowMegaMenu(true);
      setActiveMegaMenu(category);
    }
  };

  return (
    <header className="header">
      <div className="main-header">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>
          Diamond<span>Word</span>
        </a>
        
        <div className="search-container pnj-style" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search for jewelry..." 
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button type="submit">
                <i className="search-icon">🔍</i>
              </button>
            </div>
          </form>
          {showSearchResults && (
            <>
              <div className="search-overlay" onClick={() => setShowSearchResults(false)}></div>
              <SearchResults 
                results={searchResults} 
                onResultClick={handleSearchResultClick} 
                searchQuery={searchQuery}
              />
            </>
          )}
        </div>
        
        <div className="header-tools">
          <div className="wishlist-icon">❤️</div>
          <div className="cart-icon" onClick={toggleCart}>
            🛒
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </div>
          <div className="user-actions">
            <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('login'); }}>Login</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('register'); }}>Register</a>
          </div>
        </div>
      </div>
      
      <nav className="nav-menu">
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); toggleMegaMenu('collections'); }} className={activeMegaMenu === 'collections' ? 'active' : ''}>
          Collections
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); toggleMegaMenu('jewelry'); }} className={activeMegaMenu === 'jewelry' ? 'active' : ''}>
          Jewelry
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); }}>Diamonds</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Contact</a>
      </nav>
      
      {showMegaMenu && activeMegaMenu === 'collections' && (
        <>
          <div className="mega-menu-overlay" onClick={() => setShowMegaMenu(false)}></div>
          <div className="mega-menu collections-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-column">
                <h3>Featured Collections</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>New Arrivals</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Best Sellers</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Wedding & Engagement</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Limited Edition</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Exclusive Design</a></li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h3>By Occasion</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Wedding</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Engagement</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Anniversary</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Birthday</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Valentine's Day</a></li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h3>By Style</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Classic</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Modern</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Vintage</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Minimalist</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Art Deco</a></li>
                </ul>
              </div>
              <div className="mega-menu-featured">
                <div className="featured-image">
                  <img src="https://images.unsplash.com/photo-1600721391776-028bafcbfb90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Featured Collection" />
                </div>
                <div className="featured-content">
                  <h3>The Eternity Collection</h3>
                  <p>Timeless designs crafted for endless love</p>
                  <button onClick={(e) => { e.preventDefault(); setActivePage('collections'); setShowMegaMenu(false); }}>Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {showMegaMenu && activeMegaMenu === 'jewelry' && (
        <>
          <div className="mega-menu-overlay" onClick={() => setShowMegaMenu(false)}></div>
          <div className="mega-menu jewelry-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-column">
                <h3>Rings</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Engagement Rings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Wedding Bands</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Promise Rings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Eternity Rings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Stackable Rings</a></li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h3>Necklaces</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Pendants</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Chokers</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Chain Necklaces</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Lockets</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Statement Necklaces</a></li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h3>Earrings & Bracelets</h3>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Stud Earrings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Hoop Earrings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Drop Earrings</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Tennis Bracelets</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Bangle Bracelets</a></li>
                </ul>
              </div>
              <div className="mega-menu-featured">
                <div className="featured-image">
                  <img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Featured Jewelry" />
                </div>
                <div className="featured-content">
                  <h3>Signature Diamond Collection</h3>
                  <p>Exclusive designs with the finest diamonds</p>
                  <button onClick={(e) => { e.preventDefault(); setActivePage('diamonds'); setShowMegaMenu(false); }}>Explore Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
