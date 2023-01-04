

import "./style.css";
import AdminMenubar from "../../components/admin/AdminMenubar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminUser from "./AdminUser";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function UserManagement() {

  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  

  const getAllUsers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/adminGetUsers`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="admin">
      <AdminMenubar />
      <div className="admin_wrapper">
        <div className="admin_sidebar_container">
          <AdminSidebar/>
        </div>
        <div className="admin_page_container ">
          <AdminUser users={users} getAllUsers={getAllUsers} />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
