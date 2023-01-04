import "./style.css";
import AdminMenubar from "../../components/admin/AdminMenubar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPostMgent from "./AdminPostMgent";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function PostManagement() {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = ()=>{
    return <Navigate to="/admin/Posts" />
  }

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
      setPosts(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllUserPosts();
  }, []);

  return (
    <div className="admin">
      <AdminMenubar />
      <div className="admin_wrapper">
        <div className="admin_sidebar_container">
          <AdminSidebar navigate={navigate}/>
        </div>
        <div className="admin_page_container ">
          <AdminPostMgent posts={posts} getAllUserPosts={getAllUserPosts} />
        </div>
      </div>
    </div>
  );
}

export default PostManagement;
