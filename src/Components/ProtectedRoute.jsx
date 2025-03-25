import { Navigate } from 'react-router'

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({children}) {
  if(localStorage.getItem("token") == null){
    return <Navigate to={"/login"}/>
  }else{
    return children;
  }
}
