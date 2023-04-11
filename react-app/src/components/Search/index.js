import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchResult = useSelector(state => state.searchReducer);
  const dispatch = useDispatch();
  const searchResultDetails = Object.values(searchResult)
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchThunk(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <div>
      <input type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResult && Object.keys(searchResult).length > 0 ? (
        searchResultDetails.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};

export default Search;
