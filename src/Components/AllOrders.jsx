import { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

export default function AllOrders() {
  const {cartId, setCartId} = useContext(UserContext);
  async function getCart() {
    try {
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { 
        headers: {token: localStorage.getItem("token")}
      });
      setCartId(data.cartId);
      console.log(`Cart ID: ${data.cartId}`);
    } catch (error) {
      console.log(error); 
    }
  }

  async function getAllOrders() {
    if (!cartId) return; // Don't run if no cartId
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`);
    console.log(response);
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [cartId]); // Only run when cartId changes

  return (
    <>
<div className="max-w-sm p-6 mx-auto mt-24 text-center   border border-gray-200 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order Placed Successfully <FontAwesomeIcon icon={faCheckDouble} style={{color: "#63E6BE",}} /></h5>
  <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-specialBlue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Continue Shopping
    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
    </svg>
  </a>
</div>
    </>
  )
}