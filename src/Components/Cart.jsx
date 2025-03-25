import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/UserContext";

export default function Cart() {
  const [CartData, setCartData] = useState(null)
  const {setCartId} = useContext(UserContext);
  const navigate = useNavigate();

  async function removeFromCart(id) {
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {headers:{token : localStorage.getItem("token")}})
      setCartData(data);      
    } catch (error) {
      console.log(error);
    }
  }
  async function incrementCount(id , counter) {
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count : counter+1},{headers:{token : localStorage.getItem("token")}})
      setCartData(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function decrementCount(id , counter) {
    try {

      if(counter - 1 > 0){
        const {data} =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count : counter-1},{headers:{token : localStorage.getItem("token")}})
        setCartData(data);
      }else{
        removeFromCart(id);
      }

    } catch (error) {
      console.log(error);
    }
  }
  async function getCart(){
    try {
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , { headers : {token : localStorage.getItem("token")}});
      setCartData(data);      
      setCartId(data.cartId);
    } catch (error) {
      console.log(error); 
    }
  }


  useEffect(()=>{getCart()},[])
  return (
   <>
<div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {CartData?.data?.products.map((product)=>
      <tr key={product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-3">
        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
      </td>
      <td className="px-6 py-1 text-xl text-gray-900 dark:text-white">
        {product.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button onClick={()=>decrementCount(product.product._id , product.count)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <div>
            <p>{product.count}</p>
          </div>
          <button onClick={()=>incrementCount(product.product._id , product.count )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${product.price * product.count}
      </td>
      <td className="px-6 py-4">
        <button onClick={()=> removeFromCart(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
      </td>
    </tr>

      )}
      
           
    </tbody>
  </table>
</div>
<div className="flex mb-36 mt-10 justify-end me-10">
<button
  onClick={()=>navigate("/checkout")}
  type="button"
  className={`${CartData?.data.totalCartPrice == 0 ? "hidden" : null} inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}>
  Check Out
  <span className="inline-flex items-center justify-center w-11 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md">
    {CartData?.data.totalCartPrice} $
  </span>
</button>
</div>


</>
  )
}
