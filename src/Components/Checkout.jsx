import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import * as YUP from "yup"
import toast, {Toaster } from 'react-hot-toast';
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck , faDollarSign, faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheck , faMoneyCheckDollar , faDollarSign)
export default function Checkout() {

    const [error, setError] = useState(null)
    const notify = () => toast(<div>Order placed successfully <FontAwesomeIcon icon="fa-check" /></div> , {
      duration: 2000,
    position: 'top-right',
    style: {
      border: '2px solid #4CAF50',
      padding: '16px',
      color: '#4CAF50',
    },
    });
    const {cartId} = useContext(UserContext);
    const navigate = useNavigate();
    const [type , setType] = useState(null);
    async function checkoutSession(value) {
      const data = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,
       {
        "shippingAddress": value
    } , 
  {
    headers : {
      token : localStorage.getItem("token")
    }
  })
  
  window.location.href =  data.data.session.url;
  
    }
    async function cashCheckout(value) {
      try {
        const data = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
          "shippingAddress": value
      } , 
    {
      headers : {
        token : localStorage.getItem("token")
      }
    })
        console.log(data);
        notify()
        setTimeout(() => {
          navigate("/allorders"); 
        }, 3000);      
      } catch (error) {
        console.log(error);
        
      }
      
      
    }

    async function handleSubmit(value){
        try {
            type && checkoutSession(value);
            !type && cashCheckout(value);     
            
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }

    }


    const validationSchema = YUP.object().shape({
        details : YUP.string("No numbers allowed").required("Please enter your details").min(3,"Minuim 3 charecters").max(40,"Maximum 40 charecters")
        ,phone : YUP.string().required("Phone number is required").matches(/^01[0125][0-9]{8}/ , "Please enter a valid egyptian Phone number").max(11,"Please enter a valid egyptian Phone number")
        ,city : YUP.string("No Numbers allowed").required("Please enter you city").min(3,"please enter a valid city")
    })

    const x = useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },
        onSubmit : handleSubmit,
        validationSchema : validationSchema
    })


    return (

    <div>
        <form onSubmit={x.handleSubmit} className="w-1/2 flex flex-col justify-center mx-auto">
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

        <div className=" ">
          <label htmlFor="error" className="block mb-2 text-sm font-medium">Details</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.details} name="details" type="text"  className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.details && x.touched.details ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.details}</span></p>
             :  
            null
            }

          <label htmlFor="Phone" className="mt-3 block mb-2 text-sm font-medium">Phone number</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.phone} name="phone" type="text" className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.phone && x.touched.phone ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.phone}</span></p>
             :  
            null
            }


          <label htmlFor="city" className="mt-3 block mb-2 text-sm font-medium">City</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.city} name="city" type="text" className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.city && x.touched.city ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.city}</span></p>
             :  
            null
            }
        </div>
            <div className="mx-auto w-4/5 mt-10 flex">
        <button className="bg-specialBlue w-1/5 mx-auto border rounded-md p-1 text-white" onClick={()=>setType(1)} type="submit">Card  <FontAwesomeIcon icon={faMoneyCheckDollar}/></button>
        <button className="bg-specialBlue w-1/5 mx-auto border rounded-md p-1 text-white" onClick={()=>setType(0)} type="submit">Cash  <FontAwesomeIcon icon={faDollarSign} /></button>
        <Toaster/>
        </div>
        </form>
    </div>
  )
}



