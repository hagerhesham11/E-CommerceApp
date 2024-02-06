
import { RouterProvider,  createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Carts from './components/Carts/Carts.jsx';
import Categories from './components/Categories/Categories.jsx';
import CategoryProducts from './components/CategoryProducts/CategoryProducts.jsx';
import Products from './components/Products/Products.jsx';
import Login from './components/Login/Login.jsx';
import Registeration from './components/Registeration/Registeration.jsx';
import Brands from './components/Brands/Brands.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import CartContextProvider from './components/Context/CartContext.js';
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout.jsx';
import { Offline} from "react-detect-offline";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
function App() {
  const [userData , setUserData] = useState(null)
  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    //console.log(decodedToken)
    setUserData(decodedToken)
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData()
    }
  },[])

   const Router = createHashRouter([
  {path:'',element:<Layout setUserData={setUserData} userData={userData} />,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'forgot-password',element:<ForgotPassword/>},
    {path:'reset-password',element:<ResetPassword/>},
    {path:'carts',element:<ProtectedRoute><Carts/></ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'products/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'CategoryProducts/:id',element:<ProtectedRoute><CategoryProducts/></ProtectedRoute>},
    {path:'login',element:<Login saveUserData = {saveUserData}/>},
    {path:'register',element:<Registeration/>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'*',element:<NotFound/>}
  ]}
])
  return (
    <>
  <QueryClientProvider client={queryClient}>
  <CartContextProvider>
    <Offline> <div className='network'>You are currently Offline</div></Offline>
     <Toaster/>
    <RouterProvider router={Router}></RouterProvider>
    </CartContextProvider>
  </QueryClientProvider>
    
    </>
  );
}

export default App;
