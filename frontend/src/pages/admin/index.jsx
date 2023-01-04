import "./style.css";
import AdminMenubar from "../../components/admin/AdminMenubar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHome from "./AdminHome";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";


function Admin() {
  const { user } = useSelector((state) => ({ ...state }));
  const [users, setUsers] = useState('0')
  const [posts, setPosts] = useState('0')
 

  const getAllUserPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/adminGetPost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPosts(data.length)
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/adminGetUsers`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setUsers(data.length)
  };

  useEffect(() => {
    getAllUserPosts();
    getAllUsers();
  }, []);

  return (
    <div className="admin">
      <AdminMenubar />
      <div className="admin_wrapper">
        <div className="admin_sidebar_container">
          <AdminSidebar admin />
        </div>
        <div className="admin_page_container ">{<AdminHome users={users} posts ={posts} />}</div>
      </div>
    </div>
  );
}

export default Admin;
