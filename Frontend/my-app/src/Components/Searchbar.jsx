import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/allcards`);
        const data = await response.json();

        // Combine all card arrays into one
        const combinedSuggestions = [
          ...data.homecards,
          ...data.cards1,
          ...data.cards2,
          ...data.cards3,
          ...data.cards4,
          ...data.cards5
        ];

        setSuggestions(Array.isArray(combinedSuggestions) ? combinedSuggestions : []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.name && suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleSuggestionClick = (suggestion) => {
    setSelectedItemDetails(suggestion);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally handle the search submission, if needed
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemDetails(null);
  };

  return (
    <div>
      <Form className="d-flex" onSubmit={handleSubmit} style={{ backgroundColor: 'transparent' }}>
        <FormControl
          type="text"
          placeholder="Search..."
          className="input me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="btn-icon-content" type="submit" style={{ backgroundColor: 'transparent' }}>
          <FaSearch />
        </Button>
      </Form>
      
      {filteredSuggestions.length > 0 && searchTerm.trim() !== "" && (
        <DropdownButton
          id="dropdown-basic-button"
          title="Select an item"
          className="mt-2"
        >
          {filteredSuggestions.map((suggestion) => (
            <Dropdown.Item
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}

      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItemDetails && (
            <div>
              <h4>{selectedItemDetails.name}</h4>
              <p>{selectedItemDetails.description}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchBar;
