import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Login({saveUserData}) {
  let baseUrl = 'https://ecommerce.routemisr.com'
  const [errMessage , setErrMessage] = useState('')
  const [isLoading , setLoading] = useState(false)

 let navigate = useNavigate()

 async function sendData(values){
     setLoading(true)
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,values).catch((err)=>{
      setLoading(false)
      setErrMessage(err.response.data.message)
    })

    console.log(data)
    if (data.message === 'success'){
      localStorage.setItem('userToken',data.token)
      saveUserData()
      setLoading(false)
      navigate('/Home')
    }
  }

  let myValidation = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid email address'),
    password: Yup.string().required('Password is Required'),
   })


  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    //validate, 
    validationSchema: myValidation , //function that returns Yup Schema
    onSubmit:sendData
  })

  return (
   
    <div className='w-75 mx-auto py-5'>
      <h2 className='text-center py-2'>Login Form</h2>
       {errMessage.length > 0 ? <div className="alert alert-danger">{errMessage}</div>:null}
   <form onSubmit={formik.handleSubmit}>
   
    <label htmlFor="email">email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"  value={formik.values.email} className='form-control my-2' name="email" id="email"/>
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> :null}
    <label htmlFor="password">password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.password} className='form-control my-2' name="password" id="password"/>
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null }
     
     {isLoading ? <button className='text-white bg-main btn my-2' ><i className='fas fa-spinner fa-spin'></i></button> :
      <>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
              <Link className="text-main" to="/forgot-password">
                Forgot Password ? ..
              </Link>
              <div>
                <span>Dont have an account ?</span>
                <Link className="ps-2 text-main" to={"/register"}>
                  Register Now
                </Link>
              </div>

              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Login
              </button>
            </div>
      </>}

    
   </form>
    </div>
  )
}
