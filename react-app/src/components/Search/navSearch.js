import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';
import "../Navigation/Navigation.css"

const NavSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      dispatch(searchThunk(searchTerm.trim())).then(() =>
        history.push(`/search`)
      );
    }
  };


    const enterKey = (e) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }
    return (
      <div className="search-bar">
        <input type="input"
          className="input-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={enterKey}
        />
        <button className="search-button" onClick={handleSearch}></button>
      </div>
    );
  };

  export default NavSearch;
