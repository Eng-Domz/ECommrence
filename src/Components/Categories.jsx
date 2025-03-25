import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState(null)
  
    async function getCategories() {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getSubs(id) {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
            console.log(response.data.data);
            setSubCategories(response.data.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    
  
    useEffect(()=>{getCategories();},[]);
  return (
    <>   
<h1 className="text-specialBlue text-center text-4xl mb-5" >All Categories</h1>
 <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 mb-20 gap-3 px-2">
{categories.map((b)=>
   <div key={b?._id} className="max-w-sm bg-white border hover:border-gray-700 hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
<a onClick={()=>{getSubs(b?._id); setName(b?.name)}} >
 <img className="rounded-t-lg h-5/6 w-full object-cover" src={b.image} alt />

<div className="p-5">

  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-specialBlue dark:text-white">{b?.name}</h5>

</div>
</a>
</div>
)


}
</div>
{
    subCategories.length == 0 ? null : 
<>
<h1 className="text-specialBlue text-center text-4xl mb-5" >{name} Sub-categories</h1>
 <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 mb-20 gap-3 px-2">
{subCategories.map((b)=>
   <div key={b?._id} className="max-w-sm bg-white border hover:border-gray-700 hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
<div className="p-5">

  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-specialBlue dark:text-white">{b?.name}</h5>

</div>

</div>
)


}
</div>
</>
}
</>


  )
}
