import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
export default function CategorySlider() {

const [AllCategories,setCat] = useState([])
async function getAllCategories(){
 let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories') 
 setCat(data.data)
 console.log(data)
  }
  useEffect(()=>{
    getAllCategories()
  },[])
  const settings = {
    infinite: true,
    speed: 6000,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: 7,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    slidesToScroll: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
    ],
  };

  return (
    <div className='row'>
      <Slider {...settings}>
        {AllCategories.map((cat)=>{
           return <div className="col-md-3">
            <img src={cat.image} alt="" className='w-100' height={200}/>
           </div>
        })}
      </Slider>
      </div>
  )
}
