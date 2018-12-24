import React, {Component} from 'react'
import './SearchBar.css'

export default ({
  onChange,
  searchInput,
}) => (
  <div id="searchbar-container">
    <i 
      id="search-icon" 
      className={`fas fa-${searchInput.length ? 'heart pink fa-spin' : 'search'}`} 
    />
    <input
      className   = "searchbar"
      type        = "text"
      onChange    = {onChange}
      value       = {searchInput}
      placeholder = "Plz can I haz..."
    />
  </div>
)