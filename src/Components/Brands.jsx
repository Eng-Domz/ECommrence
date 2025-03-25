import axios from "axios";
import { useEffect, useState } from "react";

export default function Brands() {

  const [brands, setBrands] = useState([]);
  
  async function getBrands() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      console.log(response.data.data);
      setBrands(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(()=>{getBrands();},[]);
  return (
 <>   
 <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-20 gap-3 px-2">
{brands.map((b)=>
   <div key={b?._id} className="max-w-sm bg-white border hover:border-gray-700 hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
 <img className="rounded-t-lg " src={b.image} alt />

<div className="p-5">

  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-specialBlue dark:text-white">{b?.name}</h5>

</div>
</div>)


}
</div>
</>
  )
}
