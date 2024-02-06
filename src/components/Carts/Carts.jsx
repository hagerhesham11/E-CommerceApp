import React, { useContext, useEffect } from 'react'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";


export default function Cart() {
  let {getLoggedUserCart , removeItem ,updateProductCount ,setNumOfCartItems} = useContext(cartContext)
   let [cartDetails,setCartDetails] = useState(null)

 async function deleteItem(productId){
  let response = await removeItem(productId)
  setCartDetails(response.data.data)
  setNumOfCartItems(response.data.numOfCartItems)
   toast.success('Product removed',{duration:1000})
  //console.log(response)
 }

 async function updateProductQuantity(productId,count){
  let response = await updateProductCount(productId,count)
  setCartDetails(response.data.data)
  toast.success('Product updated')
  console.log(response)
 }

/*  async function clearCart(){
  let response = await clearUserCart()
  //setCartDetails(response.data.data)
 } */
 async function getCart(){
  let response =  await getLoggedUserCart()
  if(response?.data?.status === 'success')
  {
    setCartDetails(response.data.data)
    console.log(response)
  }
}
  useEffect(()=>{
     // eslint-disable-next-line react-hooks/exhaustive-deps
     getCart()
  },[])
  return (
    <div>
       <Helmet>
                <title>Cart Details</title>
        </Helmet>
    {cartDetails !== null ?   <div className='bg-main-light p-4 my-4'>
     <h3>Shop Cart:</h3>
     <h6 className='text-main'>Total Cart Price: {cartDetails.totalCartPrice} EGP</h6>
     {cartDetails.products.map((product)=> <div key={product.product._id} className="row border-bottom align-items-center py-2 gy-3">
      <div className="col-md-1">
        <img src={product.product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-11 d-flex justify-content-between">
        <div>
        <h6>{product.product.title}</h6>
        <h6 className='text-main'>Price: {product.price}</h6>
        <button onClick={()=>  deleteItem(product.product._id)} className='btn m-0 p-0'><i className='fa-regular text-main fa-trash-can'></i> Remove</button>
        </div>

        <div>
         <button onClick={()=> updateProductQuantity(product.product._id,product.count+1)} className='btn border-main btn-sm'>+</button>
         <span className='mx-2'>{product.count}</span>
         <button onClick={()=> updateProductQuantity(product.product._id,product.count-1)} className='btn border-main btn-sm'>-</button>

        </div>

      </div>
     </div>

     )}
     <button className='btn bg-main mt-2'>
      <Link className='text-white' to={'/checkout'}>CheckOut</Link>
     </button>
    {/* <button onClick={()=> clearCart()} className='btn text-main' ><i className='fa-regular fa-trash-can'></i> Clear cart</button> */}
    </div> : null}
    </div>


  
  )
}
