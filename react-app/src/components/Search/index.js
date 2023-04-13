import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { Link } from 'react-router-dom';
import './search.css'

const Search = () => {
  const dispatch = useDispatch();
  const searchDetails = useSelector(state => state.searchReducer);
  const searchObj = Object.values(searchDetails)
  const searchKeys = Object.keys(searchDetails)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchThunk(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <div className='search-root'>
      {/* <input type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      {searchObj.length ? (
        searchObj.map((product) => (
          <div className='search-products' key={product.id}>
            <Link className='search-product-name' to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p className='search-product-description'>{product.description}</p>
            <p className='search-product-price'>${product.price}</p>
            <p className='search-product-size'>{product.size}</p>
          </div>
        ))
      ) : (
        searchKeys ? <p>No search results found.</p> : null
      )}
    </div>
  );
};

export default Search;
