import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from '../../assets/images/slider-image-1.jpeg';
import image2 from '../../assets/images/slider-image-2.jpeg';
import image3 from '../../assets/images/slider-image-3.jpeg';
import tomato from '../../assets/images/tomatoes-321671_640.jpg';
import cherries from '../../assets/images/cherries-6308871_640.jpg'
export default function Header() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: 1,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToScroll: 1,
  };
  return (
    <div className='row gx-0 pt-1 my-3'>
      <div className="col-md-9">
      <Slider {...settings}>
            <img height={400} src={image1} alt="fresh vegetables food" />
            <img height={400} src={image2} alt="fresh vegetables food" />
            <img height={400} src={image3} alt="fresh vegetables food" />
          </Slider>
      </div>
      <div className="col-md-3 d-md-block d-none">
        <img src={cherries} alt="cherries" className='w-100' height={200} />
        <img src={tomato} alt="tomato" className='w-100' height={200} />
      </div>
     
    </div>
  )
}
