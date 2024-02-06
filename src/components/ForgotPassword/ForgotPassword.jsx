import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import ResetPassword from '../ResetPassword/ResetPassword'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  let baseUrl = 'https://ecommerce.routemisr.com'
  const [isLoading , setLoading] = useState(false)
  const [flagData, setFlagData] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  let navigate = useNavigate()
//------------------------------------forgotPassword-------------------------------------
 async function forgotPassword(val){
     setLoading(true)
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,val).catch((err)=>{
        setErrorMsg(err.response.data.message)
    })
    console.log(data)
    if(data.statusMsg === 'success'){
      setLoading(false)
      setFlagData(true)
    }
  }

  let myValidation = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid email address'),
   })


  let formik = useFormik({
    initialValues:{
      email:''
      
    },
    //validate, 
    validationSchema: myValidation , //function that returns Yup Schema
    onSubmit:(values) =>{
      forgotPassword(values)
    }
  })


  //--------------------------------verifyResetCode---------------------------------------

async function verifyResetCode(values){
  setLoading(true)
   let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,values).catch((err)=>{
    setErrorMsg(err.response.data.message)
    })
    console.log(data)
    if(data.status === 'Success'){
     setLoading(false)
     navigate('/reset-password')
   }
}
  let myValidation1 = Yup.object({
    resetCode:Yup.string().required('Reset Code is Required').matches(/^[0-9]+$/, "must be only numbers")
  })

  let formik1 = useFormik({
    initialValues: {
      resetCode:''
    },
    validationSchema:myValidation1,
    onSubmit: verifyResetCode
  })

  return (
   
    <div className='w-75 mx-auto py-5'>
      <h2 className='text-center py-2'>Forgot Password</h2>

      {flagData? <> 
        <form onSubmit={formik1.handleSubmit}>
   <label htmlFor="resetCode">Reset Code:</label>
   <input onBlur={formik1.handleBlur} onChange={formik1.handleChange} type="text"  value={formik1.values.resetCode} className='form-control my-2' name="resetCode" id="resetCode"/>
   {formik1.errors.resetCode && formik1.touched.resetCode ? <div className='alert alert-danger'>{formik1.errors.resetCode}</div> :null}
   {errorMsg.length>0 ? <div className="alert alert-danger"> {errorMsg}</div>:null}

    {isLoading ? <button className='text-white bg-main btn my-2' ><i className='fas fa-spinner fa-spin'></i></button> :
     <button disabled={!(formik1.isValid && formik1.dirty)} className='text-white bg-main btn my-2' type="submit" >Verify Code</button>}
  </form>
   
      </> : <>
      <form onSubmit={formik.handleSubmit}>
    <label htmlFor="email">email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"  value={formik.values.email} className='form-control my-2' name="email" id="email"/>
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> :null}
    {errorMsg.length>0 ? <div className="alert alert-danger"> {errorMsg}</div>:null}

     {isLoading ? <button className='text-white bg-main btn my-2' ><i className='fas fa-spinner fa-spin'></i></button> :
      <button disabled={!(formik.isValid && formik.dirty)} className='text-white bg-main btn my-2' type="submit" >Send</button>}
   </form>
      </>
      
      
      }
 

   </div>
  
  )
}
