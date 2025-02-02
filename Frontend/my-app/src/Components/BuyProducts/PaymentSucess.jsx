import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
   navigate("/Login");
  }
const handleOrders =()=>{
  navigate("/myOrders")
} 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Thank you for your purchase.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleOrders}>MyOrders</Button>
          <Button variant="primary" onClick={handleClick}>Continue shopping</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default PaymentSuccess;
