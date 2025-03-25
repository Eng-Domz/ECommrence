import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import MainSlider from "./MainSlider";
import { Link } from "react-router";
import { debounce } from "lodash";



  
export default function Home() {

    const [categories, setCategories] = useState([])
    const [filteredProds, setFilteredProds] = useState([])
    const [products, setProducts] = useState([]);
    const [err , setErr] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [isLoading , setIsLoading] = useState(true);

    const debouncedFilterProducts = debounce((input) => {
      filterProducts(input);
    }, 300);


    async function getCategories() {
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
            setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
        
    }
    async function getProds() {
      try {
        setIsLoading(true);
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(response.data.data);
        setFilteredProds(response.data.data);
    } catch (error) {
        setErr(error);
        console.log(err);
    }finally {
      setIsLoading(false);
    }
    }

    function filterProducts(input){
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase()));
        setFilteredProds(filtered);
    }

    async function addToCart(id){
      try {
       const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId : id} , {headers : {token : localStorage.getItem("token")}})
       console.log(response);
      } catch (error) {
       console.log(error);
      } 
   }

    function renderProducts(){
      return filteredProds.map((product) => 
      
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

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1300,
        cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }

    useEffect(()=>{getCategories(); getProds();},[]);

    return (
      <div className="w-full mb-48">
        <MainSlider/>
        <Slider className="mb-20" {...settings}>
        {categories.map((c) => (
          
    <div key={c._id} 
      className="w-[200px] h-[300px] flex flex-col items-center justify-between bg-white rounded-lg shadow-md p-4 border-2 mx-2" >
      <img 
        src={c?.image} 
        className="w-full h-[200px] object-cover rounded-md" 
        alt={c?.name} 
      />
      <h3 className="text-center text-lg  text-specialBlue font-semibold mt-2">
        {c?.name}
      </h3>
    </div>
  ))}
    </Slider>
    <input type="text" onInput={(e) => debouncedFilterProducts(e.target.value)} placeholder="Search" className="w-1/2 flex mx-auto rounded-2xl mb-20" />
    <>
    {err ? 
        <div className='text-4xl text-center max-h flex align-middle justify-center flex-col'>
            <h1>There was a problem</h1>
            <h3>Please load again</h3>
        </div>
        :
        <div className='mb-20'> 
            {filteredProds.length == 0 ? "Loading...." :  
            
                <div className='grid justify-center lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-1 sm:mx-auto'>


                    {renderProducts()}

                </div>}
        </div>}
    </>
 

</div>

  )
}
