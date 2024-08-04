import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import _ from "lodash";
import './SearchBar.css'; // Import the CSS file
import {useNavigate} from 'react-router-dom'
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  // Function to fetch data from the backend
  const fetchData = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/allcards?q=${searchQuery}`);
      setResults(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setResults([]);
      setShowSuggestions(false);
      alert("An error occurred while fetching data. Please try again.");
    }
  };
  

  // Debounced fetch function
  const debouncedFetch = _.debounce((searchQuery) => {
    if (searchQuery) {
      fetchData(searchQuery);
    } else {
      setResults([]);
      setShowSuggestions(false);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  // Handle click outside to close suggestions
  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-dropdown")) {
      setShowSuggestions(false);
    }
  };
  function handleClick(result){
    navigate("/ProductPage", { state: { product: result } });
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
console.log(results);
  return (
    <Container fluid className="search-bar">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} style={{  width: '369px'}}>
          <div style={{ position: 'relative'}}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search cards..."
              className="form-control"
            />
            {showSuggestions && results.length > 0 && (
              <div className="search-dropdown">
                {results.map((result, index) => (
                  <Button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleClick(result)}
                    
                  >
                    
                    {result.title}
                  </Button>
                  
                ))}
            
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
