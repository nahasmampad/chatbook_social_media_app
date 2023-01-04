import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  

 if(user){
  if(user.admin == true){
    return <Navigate to="/admin" />
  }
  return <Outlet /> 
 }else{
  return <Login />
 }
  // return user ? <Outlet /> : <Login />;
}
