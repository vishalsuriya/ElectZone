import React, { useState } from 'react';
import { Fragment } from "react";
import { countries } from "countries-list";
import CheckOut from './CheckOut';
import { useNavigate, useLocation } from 'react-router-dom';
import "../BuyProducts/ShippingStyle.css";

function Shipping() {
  const CountryList = Object.values(countries);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { items, product } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingDetails = {
      address,
      city,
      phoneNo,
      postalCode,
      state,
      country,
    };
    navigate("/ConfirmOrder", { state: { shippingDetails, items, product } });
  };

  return (
    <div>
      <CheckOut Shipping />
      <Fragment>
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-4">Shipping Info</h1>
              <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  aria-describedby="addressHelp"
                />
                <small id="addressHelp" className="form-text text-muted">Enter your street address.</small>
              </div>
              <div className="form-group">
                <label htmlFor="city_field">City</label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-describedby="cityHelp"
                />
                <small id="cityHelp" className="form-text text-muted">Enter your city.</small>
              </div>
              <div className="form-group">
                <label htmlFor="phone_field">Phone No</label>
                <input
                  type="text"
                  id="phone_field"
                  className="form-control"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  aria-describedby="phoneHelp"
                />
                <small id="phoneHelp" className="form-text text-muted">Enter your phone number.</small>
              </div>
              <div className="form-group">
                <label htmlFor="postal_code_field">Postal Code</label>
                <input
                  type="number"
                  id="postal_code_field"
                  className="form-control"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  aria-describedby="postalHelp"
                />
                <small id="postalHelp" className="form-text text-muted">Enter your postal code.</small>
              </div>
              <div className="form-group">
                <label htmlFor="country_field">Country</label>
                <select
                  id="country_field"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  aria-describedby="countryHelp"
                >
                  <option value="">Select Country</option>
                  {CountryList.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <small id="countryHelp" className="form-text text-muted">Select your country.</small>
              </div>
              <div className="form-group">
                <label htmlFor="state_field">State</label>
                <input
                  type="text"
                  id="state_field"
                  className="form-control"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  aria-describedby="stateHelp"
                />
                <small id="stateHelp" className="form-text text-muted">Enter your state.</small>
              </div>
              <button
                id="shipping_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default Shipping;
