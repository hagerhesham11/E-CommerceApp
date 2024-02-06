import React from 'react'
import amzaon from '../../assets/images/amazon1.png';
import american from '../../assets/images/americanExpress.png';
import masterCard from '../../assets/images/masterCard.png';
import paypal from '../../assets/images/paypal.png';
import appleStore from '../../assets/images/app-store.png'
import googlePlay from '../../assets/images/google-play.png';

export default function Footer() {
  return (
    <section className='bg-main-light pt-5 pb-2 mt-3 '>
      <div className="container">
         <div className="footer-top border-bottom pb-4">
          <h2>Get the FreshCart app</h2>
          <p>We will send you a link, open it in your phone to download the app.</p>
          <div className="row g-3 align-items-center">
            <div className="col-lg-10">
              <input type="email" placeholder='Email ...'  className='form-control' />
            </div>
            <div className="col-lg-2">
              <button className='btn bg-main text-white w-100'>Share App Link</button>
            </div>
          </div>

         </div>
         <div className="main-footer border-bottom py-4">
          <div className="row">
            <div className="col-lg-6">
              <p className='d-inline-block pe-2'>Payment Partners</p>
              <img src={amzaon} alt="amazon partner" width={60}/>
              <img src={american} alt="american expres"  width={60}/>
              <img src={masterCard} alt="master card"  width={60}/>
              <img src={paypal} alt="paypal"  width={60}/>
            </div>
            <div className="col-lg-6">
            <div className="d-flex flex-wrap justify-content-lg-end mt-lg-0 mt-3">
            <p className='d-inline-block pe-2'>Get deliveries with FreshCart</p>
            <img src={appleStore} alt="Apple Store" width={90} height={30}/>
            <img src={googlePlay} alt="Google play" width={90} height={30} />
            </div>
           </div>
           </div>
         </div>
         <p className="text-center my-4">
            Copyright 2024 &copy; Developed by Hager Hesham{" "}
            <i className="fa-solid fa-heart text-danger"></i> . All rights
            reserved
          </p>

      </div>
    </section>
  )
}
