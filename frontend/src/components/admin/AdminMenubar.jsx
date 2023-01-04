import React from "react";
import Logo from "../../svg/Logo.png";
import { Search, ArrowDown } from "../../svg";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const white = "#fff";

function AdminMenubar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="admin_menubar">
      <div className="admin_logo">
        <img src={Logo} alt="" />
        <span>chatbook</span>
      </div>

      <div className="admin_profile_img">
        <div className="admin_search">
          <input type="text" placeholder="Search" />
          <div className="admin_search_icon">
            <Search />
          </div>
        </div>
        <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png" alt="" />
        <div className="admin_logo_dowm_icon" onClick={()=>logout()}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default AdminMenubar;
