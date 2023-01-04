import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Friends, Home, Market, Menu } from "../../svg";

function AdminSidebar() {
  
  
    const color = '#1876F2'
  return (
    <div className="admin_sidebar ">
      <NavLink to='/admin'>
      <div className="admin_menu hover1" >
        <div className="admin_sidebar_icon">
          <Home  color={color}/>
        </div>
        <span>Home</span>
      </div>
      </NavLink>

      <NavLink to='/admin/users'>
      <div className="admin_menu hover1" >
      <div className="admin_sidebar_icon">
          <Friends color={color}/>
        </div>
        <span>Users</span>
      </div>
      </NavLink>

      <NavLink to='/admin/posts'>
      <div className="admin_menu hover1">
      <div className="admin_sidebar_icon">
          <Market color={color}/>
        </div>
        <span>Posts</span>
      </div>
      </NavLink>
     
    </div>
  );
}

export default AdminSidebar;
