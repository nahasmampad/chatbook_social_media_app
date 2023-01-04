import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";


function AdminPostMgent({ posts, getAllUserPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const postAction = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/blockPost/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    getAllUserPosts();
  };
  return (
    <div className="admin_com_header">
      <div className="admin_user_management">
        Post <span>Management</span>
      </div>
      <div className="admin_table scrollbar">
        <table className="table_inner">
          <tr>
            <th>Sl No</th>
            <th>Post Owner</th>
            <th>Email</th>
            <th>Reportes</th>
            <th>Action</th>
          </tr>
          {posts.length > 0 &&
            posts.map((post, i) => {
              return (
                <>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{post.user.username}</td>
                    <td>{post.user.email}</td>
                    <td>Ordinary</td>
                    <td>
                      <button
                        onClick={() => postAction(post._id)}
                        className={
                          post.block ? "admin_unblock_btn" : "admin_block_btn"
                        }
                      >
                        {post.block ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default AdminPostMgent;
