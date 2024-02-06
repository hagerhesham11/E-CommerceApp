import axios from 'axios'
import React, { useContext, useEffect,  useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast'

export default function ProductDetails() {
  let {id} = useParams()
  const [Product,setProduct] = useState([])
  let {addToCart,setNumOfCartItems} = useContext(cartContext)
 
  async function addProduct(productId){

    let response = await addToCart(productId)
    if(response.data.status === 'success'){
      setNumOfCartItems(response?.data?.numOfCartItems)
      toast.success(response?.data?.message,{duration:3000})
    }
    else {
      toast.error('Error')
    }
  }
  async function getSpecificProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).catch((err)=> {
     console.log(err)
    } )
    console.log(data?.data)
    setProduct(data.data)
   }

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  
  useEffect(()=>{
     // eslint-disable-next-line react-hooks/exhaustive-deps
     getSpecificProduct()
   
  
  },[])
  return (
   <div className="container my-5">
     <div className='row d-flex align-items-center'>
       <div className="col-md-4">
       <Slider {...settings}>
        {Product?.images?.map((img,idx)=>{
         return  <img key={idx} src={img} alt={Product.title}  className='w-100'/>
        })}
       </Slider>
       </div>
       <div className="col-md-8">
          <div className="product-info" >
            <p className='fw-bold'>{Product.title}</p>
            <p>{Product.description}</p>
            <p className='text-main'>{Product?.category?.name}</p> 
            <h6>Price: {Product.priceAfterDiscount ? <><span className='text-decoration-line-through text-danger'>{Product.price}</span> <span className='fw-bold ps-2 text-main'>{Product.priceAfterDiscount}EGP</span></>: <><span>{Product.price}EGP</span></>}</h6>
            <div className="box d-flex justify-content-between mb-2">
            <span className=''>Quantity: {Product.quantity}</span>
            <span><i className='fa-solid fa-star text-warning'></i>{Product.ratingsAverage}</span>
            </div>
            <button onClick={()=>{ addProduct(Product._id)}} className='btn bg-main text-white w-100'>+ Add to cart</button>

          </div>
       </div>
    </div>
   </div>
  )
}
