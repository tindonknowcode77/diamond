import React from 'react';

const SearchResults = ({ results, onResultClick, searchQuery }) => {
  // Highlight the search terms in the product names
  const highlightMatch = (text, query) => {
    if (!query || query.trim() === '') return text;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      // Create a regex with global and case-insensitive flags
      const regex = new RegExp(`(${term})`, 'gi');
      // Replace matches with highlighted version
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Calculate the total matches (for the "View all results" count)
  const totalMatches = results.length;
  
  // Limit displayed results to improve UI
  const displayedResults = results.slice(0, 5);
  
  return (
    <div className="search-results">
      <h3>Products ({totalMatches})</h3>
      <div className="search-results-list">
        {displayedResults.length === 0 ? (
          <div className="no-results">
            <p>No products found matching "{searchQuery}"</p>
            <p>Try using different keywords or check for typos</p>
          </div>
        ) : (
          displayedResults.map(product => (
            <div 
              key={product.id} 
              className="search-result-item"
              onClick={() => onResultClick(product.id)}
            >
              <div className="search-result-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="search-result-info">
                <h4>{highlightMatch(product.name, searchQuery)}</h4>
                <p className="search-result-type">{product.type}</p>
                <p className="search-result-price">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalMatches > displayedResults.length && (
        <div className="view-all-results">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            // Typically would navigate to a full search results page here
            console.log("View all search results for:", searchQuery);
          }}>
            View all {totalMatches} results
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
