import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Products() {

    async function addToCart(id){
       try {
        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId : id} , {headers : {token : localStorage.getItem("token")}})
        console.log(response);
       } catch (error) {
        console.log(error);
       } 
    }

    const [products, setProducts] = useState([])
    const [error , setError] = useState(null)



    function renderProducts(){
        return products.map((product) => 
        
        <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
          
        <Link to={"/productDetails/"+product.id}>
          <img className="p-8 rounded-t-lg mx-auto" src={product.imageCover} alt="product image" />
        <div className="px-5  flex flex-col flex-grow">
          <h5 title={product.title} className="text-xl line-clamp-1 font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
          <div className="line-clamp-2 mt-2.5 mb-5 flex-grow">
            {product.description}
          </div>
          
        </div>
        </Link>

        <div className="flex pb-5 pe-3 items-center justify-around mt-auto">
                <span className="text-3xl font-bold text-gray-900 dark:text-white w-1/2 text-center text-[clamp(1rem, 2vw, 1.5rem)]">
                ${product.price}
                </span>
                <button onClick={()=> addToCart(product.id)} className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-[clamp(0.8rem, 1.5vw, 1rem)]">
                 Add to cart
                </button>
            </div>
      </div>

      );

    }


 async function getProducts() {

    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        
        setProducts(response.data.data);        
    } catch (error) {

        setError(error);
        console.log(error);
    }
    
 }

 useEffect(()=>{getProducts()});
 
    return (
        error ? 
        <div className='text-4xl text-center max-h flex align-middle justify-center flex-col'>
            <h1>There was a problem</h1>
            <h3>Please load again</h3>
        </div>
        :

        <div className='mb-20'> 
            {products.length == 0 ? "Loading...." :  
            
                <div className='grid justify-center lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-1 sm:mx-auto'>


                    {renderProducts()}

                </div>}
        </div>
    )
}
