import React from 'react';
import { SearchBarProps } from './types';
import './SearchBar.css';

const SearchBar = ({ onChange }: SearchBarProps) => (
  <div className="search-bar">
    <label className="search-bar__label" htmlFor="filter">
      Filter body type:{' '}
    </label>
    <input
      id="filter"
      type="search"
      className="search-bar__input"
      onChange={onChange}
      placeholder="e.g. sedan"
    />
  </div>
);

export default SearchBar;
