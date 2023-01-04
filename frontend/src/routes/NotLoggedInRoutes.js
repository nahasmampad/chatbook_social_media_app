import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  

  if(user){
    if(user.admin){
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/" />
  }else{
    return <Outlet />
  }

  // return user ? <Navigate to="/" /> : <Outlet />;
}
