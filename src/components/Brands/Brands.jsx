import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'

export default function Brands() {
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data ,isLoading}= useQuery("allBrands",getAllBrands)
  console.log(data?.data.data)
  return (
   <>
   <Helmet>
   <meta name="description" content="" />
   <title>Brands</title>
   </Helmet>
   <div className="container">
    <div className="row g-4">
      {
        isLoading? (
          <div className="text-center p-5 m-5">
            <i className='fas fa-spinner fa-spin fa-3x text-main'></i>
          </div>
        ):(
          <>
          {data?.data.data.map((brand)=>{
            return <div key={brand._id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="brand rounded-3 border border-2 overflow-hidden">
                <img src={brand.image} alt={brand.slug} className='w-100'/>
                <h3 className='h6 fw-semibold text-center my-4'>{brand.name}</h3>
              </div>
            </div>
          })}
          </>
        )
      }
    </div>
   </div>
   </>
  )
}
