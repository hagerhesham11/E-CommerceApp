import React from 'react'
import notFound from '../../assets/images/error.svg'
export default function NotFound() {
  return (
    <div className='text-center py-5'>
      <img src={notFound} alt="pageNotFound" />
    </div>
  )
}
