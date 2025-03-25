import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons/faHeartCrack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import { useEffect, useState } from "react";

export default function WishList() {
    const [items, setItems] = useState([]);

    async function addToCart(id){
        try {
         const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId : id} , {headers : {token : localStorage.getItem("token")}})
         console.log(response);
         setItems(items.filter(item => item.id !== id));
        } catch (error) {
         console.log(error);
        } 
     }

    async function getList() {
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {headers : {token : localStorage.getItem("token")}});
            console.log(response.data.data);
            setItems(response.data.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    async function removeFromList(x) {
        try {
            const response =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${x}`, {
                headers: { token: localStorage.getItem("token") }
            });
            console.log(response);
            setItems(items.filter(item => item.id !== x));
        } catch (error) {
            console.log(error);
            
        }
    }


useEffect(()=>{getList()},[]);



  return (
    

<div className="w-2/3 mx-auto mb-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div className="flex items-center justify-between mb-4">
    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">My Wish List</h5>
  </div>
  <div className="flow-root">
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {
            items == 0? <li className="text-3xl">No items in wishlist</li>

            : items.map((i)=>
                <li key={i.id} className="py-1 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="w-20 h-20 rounded-full" src={i.imageCover} />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {i.title}
                </p>
              </div>
              <div className="inline-flex me-10 items-center text-base font-semibold text-gray-900 dark:text-white">
                {i.price} $
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button onClick={()=>removeFromList(i.id)} className="mx-3"><FontAwesomeIcon icon={faHeartCrack} /></button>
                <button onClick={()=>addToCart(i.id)} className="mx-3"><FontAwesomeIcon icon={faCartShopping} /></button>
              </div>
            </div>
          </li>
            
            
            )
        }

    
      
     
    </ul>
  </div>
</div>

  )
}
