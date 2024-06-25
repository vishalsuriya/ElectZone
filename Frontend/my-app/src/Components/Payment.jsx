import React from 'react'
import CheckOut from './CheckOut'

export default function Payment  () {
  return (
    <div>
    <CheckOut Shipping ConfirmOrder Payment />
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
        <form className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
           
            </div>
            
            <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
          
            </div>
            
            <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
           
            </div>

        
            <button
            id="pay_btn"
            type="submit"
            className="btn btn-block py-3"
            >
            Pay - 
            </button>

        </form>
    </div>
</div>
</div>
  )
}
