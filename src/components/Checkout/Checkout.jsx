import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import {Helmet} from "react-helmet";



export default function Checkout() {
  let {onlinePayment,cartId} = useContext(cartContext) 


 async function handleSubmit(values){
  let response = await onlinePayment(cartId,values)
  if(response?.data?.status === 'success'){
    console.log(response.data.session.url)
    window.location.href = response.data.session.url
    console.log(response)
  }
  }

  let formik =  useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:''
    },
    onSubmit:handleSubmit
  })
  return (
    <div className='mx-auto w-50 py-5'>
       <Helmet>
                <title>Checkout</title>
        </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details:</label>
        <input type="text" value={formik.values.details} onChange={formik.handleChange} className='form-control mb-3' id="details" name="details" />
        <label htmlFor="phone">phone:</label>
        <input type="tel" value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-3' id="phone" name="phone" />
        <label htmlFor="city">city:</label>
        <input type="text" value={formik.values.city} onChange={formik.handleChange} className='form-control mb-3' id="city" name="city" />
        
        <button type='submit' className='btn bg-main text-white'>Pay</button>
      </form>
    </div>
  )
}
