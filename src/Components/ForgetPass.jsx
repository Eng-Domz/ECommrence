import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import * as YUP from "yup";
import { UserContext } from '../Context/UserContext';

export default function ForgetPass() {
    const navgate = useNavigate();
    const {setToken} =  useContext(UserContext);
    const [sent, setSent] = useState(false)
     const validationSchema = YUP.object().shape({
            email : !sent ? YUP.string().required("Must enter email").email("enter valid email"): null ,
            resetCode : sent? YUP.string().required("Enter Code"):null
        })
    


        async function handleSubmit(values){
            if(!sent){
            localStorage.setItem("email",values.email);
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{email:values.email})
            setSent(true);
            console.log(response);
        }else{
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{resetCode : values.resetCode})
            console.log(data.status);
            if(data.status == "Success"){
              setToken("temp");
              localStorage.setItem("token","temp");
              navgate("/newpass")
             }
        }
    }
    
        const formik = useFormik({
                initialValues:{
                    email:"",
                    resetCode:"",
                },
                onSubmit : handleSubmit,
                validationSchema : validationSchema
            })

  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  
  {
    !sent &&
    <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
   
   {
    formik.errors.email && formik.touched.email?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{formik.errors.email}</span> 
  </div>
  : null
   }
    

  </div>
  }




 {
    sent &&
  <div className="mb-5">
    <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
    <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name='resetCode' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
    
    {
        formik.errors.resetCode && formik.touched.resetCode?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">!</span> {formik.errors.resetCode}
      </div>
      : null
    }
    
  </div>
 }

 <div className="flex justify-between ">

    {
        sent ? 
        <button type="submit" className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
        :
        <button type="submit" className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send Code</button>
    }
 </div>
</form>
  )
}
