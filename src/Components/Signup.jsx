import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import * as YUP from "yup";
import { UserContext } from "../Context/UserContext";
export default function Signup() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {setToken} = useContext(UserContext);


   
    
    async function handleSubmit(value){
        try {
            console.log(value);
            
            setIsLoading(true);
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value);
            setToken(data.token);
            localStorage.setItem("token",data.token)
            setIsLoading(false);
            setError(null);
            console.log(data);
            
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }finally{
            setIsLoading(false);
        }

    }
    
    const validationSchema = YUP.object().shape({
        name : YUP.string().required("Please enter your first name").min(3,"Name must be larger than 3 letters").max(12,"Name must be smaller than 12 letters")
        ,email : YUP.string().required("Please enter email").email("Please enter a valid email")
        ,password : YUP.string().required("Please enter password").min(7,"Password must be atleast 7 charecters").matches(/[A-Z].{6}/ , "Must start with capital")
        ,rePassword : YUP.string().required("Please enter the same password").oneOf([YUP.ref("password") ], "RePassword must match password")
        ,phone : YUP.string().required("Phone number is required").matches(/^01[0125][0-9]{8}/ , "Please enter a valid egyptian Phone number").max(11,"Please enter a valid egyptian Phone number")
    })
    
    
    const x =  useFormik({
        initialValues:{
            name:"",
            email:"",
            phone:"",
            password:"",
            rePassword:""
        },
        onSubmit : handleSubmit,
        validationSchema : validationSchema
    }
    )


  return (
    
    
    
    <div>
        
<form onSubmit={x.handleSubmit} className="max-w-md mx-auto">

{
    error? <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <div className="ms-3 text-sm font-medium">
      {error}
    </div>
    
  </div>: null
}   


        <div>
            <h2 className="max-w-md mx-auto text-blue-600 text-2xl mb-4">Register Form</h2>
            </div>
  <div className="relative z-0 w-full mb-5 group">
  <input
  onBlur={x.handleBlur}
  onChange={x.handleChange}
  value={x.values.name}
  type="text" name="name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
      
      {x.errors.name && x.touched.name?
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{x.errors.name}</span> 
    </div>
    : null
      }
      

    </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
    onBlur={x.handleBlur}
    onChange={x.handleChange}
    value={x.values.email}
    type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  
    {x.errors.email && x.touched.email?
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{x.errors.email}</span>
    </div>
    : null
      }



  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
    onBlur={x.handleBlur}
    onChange={x.handleChange}
    value={x.values.password}
    type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  
    {x.errors.password && x.touched.password?
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{x.errors.password}</span>
    </div>
    : null
      }

  
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
    onBlur={x.handleBlur}
    onChange={x.handleChange}
    value={x.values.rePassword}
    type="password" name="rePassword" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  
    {x.errors.rePassword && x.touched.rePassword?
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{x.errors.rePassword}</span>
    </div>
    : null
      }

  
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <div className="relative z-0 w-full mb-5 group">
      <input
      onBlur={x.handleBlur}
      onChange={x.handleChange}
      value={x.values.phone}
      type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (01234567890)</label>
      
      {x.errors.phone && x.touched.phone?
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{x.errors.phone}</span>
    </div>
    : null
      }

    
    </div>
  </div>
  
  <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading? "loading..." : "submit"}
  </button>
</form>
        </div>
  )
}
