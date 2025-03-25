import axios from 'axios';
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import * as YUP from 'yup';
import { UserContext } from '../Context/UserContext';
export default function ResetPass() {

    const [cError, setCerror] = useState(null);
    const navigate = useNavigate();
    const {setToken} = useContext(UserContext);
        
        function logout(){
            setToken(null);
            localStorage.removeItem("token"); 
        }

    const validationSchema = YUP.object().shape({
        currentPassword : YUP.string().required("please enter your current password")
        ,password : YUP.string().required("Please enter password").min(7,"Password must be atleast 7 charecters").matches(/[A-Z].{6}/ , "Must start with capital")
        ,rePassword : YUP.string().required("Please enter the same password").oneOf([YUP.ref("password") ], "RePassword must match password")
    })


    async function handleSubmit(value) {
        try {
            console.log(value);
            const res = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",value,{headers:{token : localStorage.getItem("token")}})
            console.log(res.data);
            alert("Password was reset Successfully");
            logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
            setCerror(error);
            
        }
    }


    const formik = useFormik({
        initialValues : {
            currentPassword:"",
            password:"",
            rePassword:""
        },
        onSubmit : handleSubmit,
        validationSchema : validationSchema
    })

  return (
    
<form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  
  <div className="mb-5">
    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
    <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword} name='currentPassword' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
   
   {
    formik.errors.currentPassword && formik.touched.currentPassword || cError?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">Incorrect Current Password!</span> 
  </div>
  : null
   }
    

  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
    <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
    
    {
        formik.errors.password && formik.touched.password?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">!</span> {formik.errors.password}
      </div>
      : null
    }
    

  </div>
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter password</label>
    <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
    
    {
        formik.errors.rePassword && formik.touched.rePassword ? 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">!</span> {formik.errors.rePassword}
      </div>
      : null
    }
    

  </div>
 <div className="flex justify-between ">
  <button type="submit" className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset password</button>
  <Link to={"/forgotpass"} className=" mx-4 text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Forgot password?</Link>
 </div>
</form>


  )
}
