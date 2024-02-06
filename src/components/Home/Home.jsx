import React from 'react'
import Header from '../Header/Header.jsx'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct.jsx'
import CategorySlider from '../CategorySlider/CategorySlider.jsx'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="container">
        <h3 className='pb-5'>Popular Categories:</h3>
      <CategorySlider/>
      <h3 className='py-5'>Featured Products:</h3>
      <FeaturedProduct/>
      </div>
      
     
    </div>
  )
}
