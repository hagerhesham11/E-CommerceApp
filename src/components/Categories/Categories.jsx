import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {

function getAllCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
 }
 let {data,isLoading} = useQuery("allCategories", getAllCategories)
 //console.log(data?.data.data)
  return (
   <>
   <Helmet>
   <meta name="description" content="" />
   <title>Categories</title>
   </Helmet>
    <div className='container'>
      <div className="row g-3">
        {isLoading ? (
          <div className="text-center p-5 m-5">
            <i className='fas fa-spinner fa-spin fa-3x text-main'></i>
          </div>
        ):(
         <>
         {data?.data.data.map((category)=>{
           return <div key={category._id} className="col-xl-2 col-lg-3 col-md-4">
            <Link to={`/CategoryProducts/${category._id}`}>
              <div className="category rounded-3 border border-2 overflow-hidden">
                <img src={category.image} alt={category.slug} className='w-100' height={300}/>
                <h3  className='h6 fw-semibold text-center my-4'>{category.name}</h3>
              </div>
            </Link>
           </div>
         })}
         </>
        )}
      </div>
    </div>
   </>
  )
}
