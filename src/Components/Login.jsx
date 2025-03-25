import { useFormik } from "formik"
import { useContext, useState } from "react";
import * as YUP from "yup";
import axios from 'axios';
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router";
export default function Login() {
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {setToken} = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = YUP.object().shape({
        email : YUP.string().required("Must enter email").email("enter valid email"),
        password : YUP.string().required("Enter password").matches(/[A-Z].{6}/ , "Must start with capital and atleast 6 charecters")
    })
    async function handleSubmit(value){
        setIsLoading(true);
        try {
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , value)
            console.log(data);
            setErrorMsg(null);
            setToken(data.token);
            localStorage.setItem("token",data.token);
            navigate('/');
        } catch (err) {
            console.log(err);
        }finally{
            setIsLoading(false)
        }
    }
    const x = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit : handleSubmit,
        validationSchema : validationSchema
    })
    
  return (
    <div>
        <form onSubmit={x.handleSubmit} className="max-w-sm mx-auto mt-24">
        {
    errorMsg? <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <div className="ms-3 text-sm font-medium">
      {errorMsg}
    </div>
    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
      <span className="sr-only">Dismiss</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
    </button>
  </div>: null
}   

    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       type="email" 
       name="email"  
       value={x.values.email} 
       onBlur={x.handleBlur} 
       onChange={x.handleChange} />
    </div>

    {x.errors.email && x.touched.email? <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <div className="ms-3 text-sm font-medium">
    {x.errors.email}
  </div>
  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
    <span className="sr-only">Dismiss</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>
 :"" }
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input type="password" id="password" 
      name="password"  
      value={x.values.password} 
      onBlur={x.handleBlur} 
      onChange={x.handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    {x.errors.password && x.touched.password? <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <div className="ms-3 text-sm font-medium">
    {x.errors.password}
  </div>
  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
    <span className="sr-only">Dismiss</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>
 :"" }
<div className="flex justify-between">
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isLoading? "Loading":"Submit"}
        </button>
        <Link to={"/forgotpass"} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Forgot Password ?</Link>
        </div>
  </form>
  
  </div>
  )
}
