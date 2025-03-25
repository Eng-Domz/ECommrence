import axios from 'axios';
import { useFormik } from 'formik'
import { useContext } from 'react';
import * as YUP from "yup";
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router';



export default function NewPass() {

    const {setToken} = useContext(UserContext);
    const navigate = useNavigate();


    const validationSchema = YUP.object().shape({
        newPassword : YUP.string().required("Please enter password").min(7,"Password must be atleast 7 charecters").matches(/[A-Z].{6}/ , "Must start with capital")
    })
    
    async function handleSubmit(value) {
        try {
            setToken(null);
            const response = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",{email : localStorage.getItem("email"), newPassword : value.newPassword})
            console.log(response.data.token);
            localStorage.removeItem("email");
            localStorage.setItem("token",response.data.token);
            setToken(response.data.token);
            alert("Password reset Successfully!")
            navigate("/");
        } catch (error) {
            console.log(error);
            
        }
    }

    const formik = useFormik({
        initialValues :{
            email : "",
            newPassword:""
        },
        validationSchema :validationSchema,
        onSubmit : handleSubmit
    })


  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  
   
    
    <div className="mb-5">
      <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter new password</label>
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name='newPassword' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
      
      {
          formik.errors.newPassword && formik.touched.newPassword ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">!</span> {formik.errors.newPassword}
        </div>
        : null
      }
      
  
    </div>
   <div className="flex justify-between ">
    <button type="submit" className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset password</button>
   </div>
  </form>
  )
}
