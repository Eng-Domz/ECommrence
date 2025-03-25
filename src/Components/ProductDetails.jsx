import axios from "axios";
import { useEffect , useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

import { faHeart} from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function ProductDetails() {
    const {id} = useParams();
    const [productDetails, setProductDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false);
    const navigate = useNavigate();
    async function addToCart(id){
        try {
        await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId : id} , {headers : {token : localStorage.getItem("token")}})
         setDone(true);
        } catch (error) {
         console.log(error);
        } 
     }

     async function toggleWishlist() {
        try {
            if (isInWishlist) {
                await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                    headers: { token: localStorage.getItem("token") }
                });
                console.log("Item removed from wishlist");
            } else {
               
                await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", 
                    { productId : id }, 
                    { headers: { token: localStorage.getItem("token") } }
                );
                console.log("Item added to wishlist");
            }
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        }
    }

     

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      }
    
    useEffect(() => {
        async function inWishlist(id){
            try {
             const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {headers : {token : localStorage.getItem("token")}})
             const wishlistItems = response.data.data;
             console.log(wishlistItems.some(item => item._id === id) , "aaaaaaaaaaaaaaaaa");
             setIsInWishlist(wishlistItems.some(item => item._id === id)) ;
            } catch (error) {
             console.log(error);
            } 
         }

        async function getProductDetails(){
            setIsLoading(true)            
            try {
                const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+id);
                setProductDetails(data.data);
                console.log(id);
                inWishlist(id);
            } catch (error) {
                console.log(error);
                          
            }finally{
                setIsLoading(false)
            }
        }
       
        setDone(false);
        getProductDetails();
    },[]);

    if(isLoading)
        return "loading....."
    return (
    <div className="min-h-screen m-0">
        <div className="flex  gap-3">
            <div className="w-1/3">
            <Slider {...settings}>
            {productDetails?.images.map((i , index)=> 
            <div key={index}>
                <img src={i} className="w-80 object-cover" alt="" />
            </div>
            )}
            </Slider>
            </div>
        <div className="w-2/3 gap-3 flex flex-col justify-center">
            <span className="lg:text-4xl text-2xl">{productDetails?.title}</span>
            <span className="lg:text-2xl text-neutral-600  mb-10">{productDetails?.description}</span>
            <div className="flex justify-between ">
            <span className="lg:text-3xl">{productDetails?.price} EGP</span>
            <span className="lg:text-3xl">{productDetails?.ratingsAverage} <FontAwesomeIcon className="lg:text-3xl text-yellow-300" icon={fas.faStar}/></span>
            <button onClick={()=>toggleWishlist()}>
            {
                isInWishlist ? <FontAwesomeIcon icon={solidHeart} className="text-2xl text-red-500" /> : <FontAwesomeIcon icon={faHeart} className="text-2xl"/>
            }
            </button>
            
            <button type="button"  onClick={()=>addToCart(id )} className="
    text-white 
    bg-specialBlue hover:bg-blue-800 
    focus:ring-4 focus:outline-none focus:ring-blue-300 
    font-medium rounded-lg 
    text-sm md:text-base lg:text-lg 
    px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 
    inline-flex items-center 
    me-2 
    dark:bg-blue-600 dark:hover:bg-specialBlue dark:focus:ring-blue-800
  ">
            <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            Add to cart
            </button>

            </div>
            {
             done &&
            <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <div className="flex justify-around">
            <div className="flex items-center">
            <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Added to cart Successfully</h3> 
        </div>
        <div className="flex">
            <button onClick={()=>{{navigate("/cart")} ; setDone(false)}} type="button" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
           Go To Cart
            </button>
            <button type="button" onClick={()=>{setDone(false)}} className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
            Dismiss
            </button>
         </div>
            </div>
    </div>
            }
        </div>
       

    </div>
    </div>
  )
}
