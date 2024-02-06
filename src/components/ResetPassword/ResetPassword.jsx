import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {
  let baseUrl = 'https://ecommerce.routemisr.com'
  const [errMessage , setErrMessage] = useState('')
  const [isLoading , setLoading] = useState(false)

  let navigate = useNavigate()

  async function resetPassword(values){
      setLoading(true)
     let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,values).catch((err)=>{
       setLoading(false)
       setErrMessage(err.response.data.message)
     })
 
     console.log(data)
     if (data.token){
       setLoading(false)
       navigate('/login')
     }
   }

   let myValidation = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid email address'),
    newPassword: Yup.string().required('Password is Required'),
   })


  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema: myValidation ,
    onSubmit:resetPassword
  })
  return (
    <div className='w-75 mx-auto py-5'>
    <h2 className='py-2'>Reset Password</h2>
     {errMessage.length > 0 ? <div className="alert alert-danger">{errMessage}</div>:null}
 <form onSubmit={formik.handleSubmit}>
 
  <label htmlFor="email">Email:</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"  value={formik.values.email} className='form-control my-2' name="email" id="email"/>
  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> :null}
  <label htmlFor="newPassword">New Password:</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.newPassword} className='form-control my-2' name="newPassword" id="newPassword"/>
  {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : null }
   
   {isLoading ? <button className='text-white bg-main btn my-2' ><i className='fas fa-spinner fa-spin'></i></button> :
    <>
   <button type='submit' className='btn bg-main text-white mt-2'  disabled={!(formik.isValid && formik.dirty)} >Reset Password</button>
    </>}

  
 </form>
  </div>
  )
}
