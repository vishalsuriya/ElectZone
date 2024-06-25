import React ,{Fragment} from 'react'
import CheckOut from './CheckOut';
import "../Components/CheckOutStyle.css";
export default function ConfirmOrder (props) {
  return (
    <Fragment>
    <CheckOut Shipping ConfirmOrder/>
    <div className="row d-flex justify-content-between">
    <div className="col-12 col-lg-8 mt-5 order-confirm">
        <h4 className="mb-3">Shipping Info</h4>
        <p><b>Name:</b> </p>
        <p><b>Phone:</b>{props.phoneNo} </p>
        <p className="mb-4"><b>Address:</b>{props.address} </p>
        <hr />
        <h4 className="mt-4">Your Cart Items:</h4>
              <div className="cart-item my-1">
               <div className="row">
               <div className="col-4 col-lg-2">
               <img  height="45" width="65" />
                </div>
                 <div className="col-5 col-lg-6">
                     </div>
                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                   
                      </div>
                       </div>
                        </div>
                        <hr />
      
            <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values"></span></p>
                <p>Shipping: <span className="order-summary-values"></span></p>
                <p>Tax:  <span className="order-summary-values"></span></p>

                <hr />

                <p>Total: <span className="order-summary-values"></span></p>

                <hr />
               <a href='Payment'><button id="checkout_btn"className="btn btn-primary btn-block">Proceed to Payment</button></a> 
            </div>
    </div>
</div>
</div>
</Fragment>

  )
}
