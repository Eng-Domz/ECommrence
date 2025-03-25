import { createBrowserRouter , RouterProvider} from 'react-router';
import './App.css'
import Login from './Components/Login';
import Layout from './Components/Layout';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Brands from './Components/Brands';
import Cart from './Components/Cart';
import Products from './Components/Products';
import NotFoundPage from './Components/NotFoundPage';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductDetails from './Components/productDetails'
import WishList from './Components/WishList';
import Categories from './Components/Categories';
import Checkout from './Components/Checkout';
import ResetPass from './Components/ResetPass';
import ForgetPass from './Components/ForgetPass';
import AllOrders from './Components/AllOrders';
import NewPass from './Components/NewPass';
const provider = createBrowserRouter([
  {element:<Layout/> , path:"", children:[
    {index: true ,element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:"Login",element: <Login/>},
    {path:"signup",element: <Signup/>},
    {path:"resetpass",element: <ResetPass/>},
    {path:"forgotpass",element: <ForgetPass/>},
    {path:"checkout",element: <ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:"newpass",element: <ProtectedRoute><NewPass/></ProtectedRoute>},
    {path:"brands", element:  <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"cart", element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"categories", element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"wishlist", element: <ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:"products",element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:"productDetails/:id",element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path :"/*" ,element: <NotFoundPage/>},
  ]}
], {
  basename: "/ECommrence"  // Must match your repo name exactly
})
function App() {

  return (

    <UserContextProvider>
      <RouterProvider basename="/ECommrence" router={provider} />
    </UserContextProvider>

  )
}

export default App
