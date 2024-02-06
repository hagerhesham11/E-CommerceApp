import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'

export default function FeaturedProduct() {
  const [AllProducts,setProd] = useState([])
  let {addToCart,setNumOfCartItems} = useContext(cartContext)
 
  async function addProduct(productId){

    let response = await addToCart(productId)
    if(response.data.status === 'success'){
      setNumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message,{duration:3000})
    }
    else {
      toast.error('Error')
    }
  }
  async function getAllProducts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setProd(data?.data)
    //console.log(data.data)
  }
 
  useEffect(()=>{
    getAllProducts()
  },[])

  

  return (
    <div className='row g-4'>
      {AllProducts.slice(0,34).map((product)=>{
        return <div key={product._id} className="col-md-2">
        <div className="product py-3 px-2 cursor-pointer position-relative ">
        <Link to={`/products/${product._id}`}>
         <img src={product.imageCover} alt="" className='w-100'/>
          {/**<p className='text-main mb-0 fw-bold'>{product.category.name}</p> */}
          <p className='fw-bold'>{product.title.split(" ").slice(0,2).join(" ")}</p>
          <div className="box d-flex justify-content-between">
            <span className="">{product.price}EGP</span>
            <span><i className='fa-solid fa-star text-warning'></i>{product.ratingsAverage}</span>
          </div>
         </Link>
          <div className="d-flex justify-content-center">
          <button onClick={()=>{addProduct(product._id)}} className='btn bg-main text-white w-100'>+ Add</button>

          </div>
        </div>
        </div>
      })}
    </div>
  )
}
