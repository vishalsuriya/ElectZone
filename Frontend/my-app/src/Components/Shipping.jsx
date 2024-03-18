import React,{useState} from 'react';
import { Fragment } from "react";
import { countries } from "countries-list";
import BuyProducts from './CheckOut';
import "../Components/CheckOutStyle.css";
import { useNavigate } from 'react-router-dom';
import "../Components/ShippingStyle.css";
import 'react-toastify/dist/ReactToastify.css'
function Shipping() {
  const CountryList = Object.values(countries);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      navigate("/ConfirmOrder");

      const shippingDetails = {
        address,
        city,
        phoneNo,
        postalCode,
        state,
        country,
      };
  };
  return (
    <div>
        <BuyProducts Shipping/>
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
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city_field">City</label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_field">Phone No</label>
                <input
                  type="phone"
                  id="phone_field"
                  className="form-control"
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postal_code_field">Postal Code</label>
                <input
                  type="number"
                  id="postal_code_field"
                  className="form-control"
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country_field">Country</label>
                <select
                  id="country_field"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {CountryList.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="state_field">State</label>
                <input
                  type="text"
                  id="state_field"
                  className="form-control"
                  required
                  onChange={(e) => setState(e.target.value)}
                />
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
