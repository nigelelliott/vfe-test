import React from 'react';
import { SearchBarProps } from './types';
import './SearchBar.css';

const SearchBar = ({ onChange }: SearchBarProps) => (
  <div className="search-bar">
    <div className="search-bar__label">Filter body type: </div>
    <input
      type="search"
      className="search-bar__input"
      onChange={onChange}
      placeholder="e.g. sedan"
    />
  </div>
);

export default SearchBar;
