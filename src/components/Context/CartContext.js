import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext = createContext()


export default function CartContextProvider(props){

  const [cartId,setCartId] = useState(null)
  const [numOfCartItems,setNumOfCartItems] = useState(0)

 /*  async function getCartId(){
    let response = await getLoggedUserCart()
    if(response?.data?.status === 'success'){
    }
  } */

  async function getCart(){
    let response = await getLoggedUserCart()
    if(response?.data?.status === 'success'){
      setCartId(response.data.data._id)
    setNumOfCartItems(response.data.numOfCartItems)
    }
    console.log(response)
  }

  useEffect(()=>{
 // eslint-disable-next-line 
    getCart()
  },[])
let userToken = localStorage.getItem('userToken')
let headers = {token: userToken}
   

function addToCart(id){
    
          return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId:id } , {headers: headers })
          .then((response)=>response).catch((error)=>error)
    }
 function getLoggedUserCart(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers}).then((res)=>res).catch((err)=>err)
}  

function removeItem(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:headers}).then((res)=>res).catch((err)=>err)
}
function updateProductCount(productId,count){
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count},{headers:headers}).then((res)=>res).catch((err)=>err)
}

function clearUserCart(){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers}).then((res)=>res).catch((err)=>err)
}

function onlinePayment(cartId ,shippingAddress){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
  { 
    shippingAddress:shippingAddress
  },
  {
    headers:headers
  }
  ).then((res)=>res).catch((err)=>err)
}



  return <cartContext.Provider value={{ getCart,cartId,numOfCartItems,setNumOfCartItems,addToCart ,getLoggedUserCart ,removeItem ,updateProductCount ,clearUserCart ,onlinePayment}}>
    {props.children}
  </cartContext.Provider>

}

/**                       method (     url                   ,               body  ,  configObject ex: Headers)
 *   await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{body} , {configObject})
 */