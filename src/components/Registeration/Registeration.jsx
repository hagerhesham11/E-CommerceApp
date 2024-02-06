import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Registeration() {
  let baseUrl = 'https://ecommerce.routemisr.com'
  const [errMessage , setErrMessage] = useState('')
  const [isLoading , setLoading] = useState(false)

 let navigate = useNavigate()

 async function sendData(values){
     setLoading(true)
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,values).catch((err)=>{
      setLoading(false)
      setErrMessage(err.response.data.message)
    })

    console.log(data)
    
    if (data.message === 'success'){
      setLoading(false)
      navigate('/login')
    }
  }
  
//custom validation:

  // function validate(values){
  //   let errors={}
  //   if(!values.name){
  //     errors.name="Name is Required"
  //   }else if(values.name.length < 3){
  //     errors.name="Name minLength is 3"
  //   }
  //   if (!values.email) {
  //     errors.email = 'Email is Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }
  //   if (!values.phone) {
  //     errors.phone = 'Phone is Required';
  //   } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Invalid phone number';
  //   }
  //   if (!values.password) {
  //     errors.password = 'Password is Required';
  //   } else if (!/^[A-Z][a-z0-9]{6,}$/i.test(values.password)) {
  //     errors.password = 'Invalid Password';
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword = 'rePassword is Required';
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = 'rePassword does not match Password';
  //   }
  //   return errors
  // }

//  validation using 3rd party library -- Yup :
   let myValidation = Yup.object({
    name: Yup.string().required('Name is Required').min(3,'minLength is 3').max(10,'maxLength is 10'),
    email: Yup.string().required('Email is Required').email('Invalid email address'),
    password: Yup.string().required('Password is Required').matches("^[A-Z][a-zA-Z0-9!@$#*^%*()_-]{3,16}$",'Invalid Password'),
    rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')],'rePassword must match Passsword'),
    phone: Yup.string().required('Phone is Required').matches("^01[1052][0-9]{8}$",'Invalid Phone Number')
   })


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    //validate, 
    validationSchema: myValidation , //function that returns Yup Schema
    onSubmit:sendData
  })
  return (
   
    <div className='w-75 mx-auto py-5'>
      <h2 className='text-center py-2'>Registeration Form</h2>
       {errMessage.length > 0 ? <div className="alert alert-danger">{errMessage}</div>:null}
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="name">name:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.name} className='form-control my-2' name="name" id="name"/>
    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null }
    <label htmlFor="email">email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"  value={formik.values.email} className='form-control my-2' name="email" id="email"/>
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> :null}
    <label htmlFor="password">password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.password} className='form-control my-2' name="password" id="password"/>
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null }
    <label htmlFor="rePassword">rePassword:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.rePassword} className='form-control my-2' name="rePassword" id="rePassword"/>
    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null }
    <label htmlFor="phone">phone:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" value={formik.values.phone} className='form-control my-2' name="phone" id="phone"/>
    {formik.errors.phone && formik.touched.phone ?  <div className='alert alert-danger'>{formik.errors.phone}</div> : null  }
     
     {isLoading ? <button className='text-white bg-main btn my-2' ><i className='fas fa-spinner fa-spin'></i></button> :
      <button disabled={!(formik.isValid && formik.dirty)} className='text-white bg-main btn my-2' type="submit" >Submit</button>}
    
    
   </form>
    </div>
  )
}
