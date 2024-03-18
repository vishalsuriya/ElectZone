import React from 'react'
import {Link} from "react-router-dom";
 const BuyProducts = ({Shipping , ConfirmOrder,Payment}) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
            {
            Shipping ?
            <Link to="/Shipping">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping Info</div>
                <div className="triangle-active"></div>
            </Link>:
             <Link to="/Shipping">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Shipping Info</div>
                <div className="triangle-incomplete"></div>
             </Link>
            }

            { ConfirmOrder ? 
            <Link to="/ConfirmOrder">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link>:
             <Link to="/ConfirmOrder">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
             </Link>
            }

            
            { Payment ?
            <Link to="/Payment">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link>:
             <Link to="/Payment">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
             </Link>
            }
    
      </div>
  )
}
export default BuyProducts;