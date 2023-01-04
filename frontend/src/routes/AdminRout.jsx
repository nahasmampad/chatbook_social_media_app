import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function AdminRoute() {
  const { user } = useSelector((state) => ({ ...state }));
    if(user){
        if(user.admin){
            return <Outlet />
        } else{
            return  <Navigate to="/login" />
        }
    }else{
        return  <Navigate to="/login" />
    }


//   return user.admin == true ? <Outlet /> : <Navigate to="/login" />;
}
