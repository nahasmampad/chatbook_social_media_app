import axios from "axios";
import { useSelector } from "react-redux";
import block from "../../svg/x-circle-fill.svg";

function AdminUser({ users, getAllUsers }) {
  const { user } = useSelector((state) => ({ ...state }));
  const userAction = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/blockUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    getAllUsers()

    console.log("data=>", data);
  };
  return (
    <div className="admin_com_header">
      <div className="admin_user_management">
        User <span>Management</span>
      </div>
      <div className="admin_table scrollbar">
        <table className="table_inner">
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.block ? "Blocked" : "Oridnery"}</td>
              <td>
                <button
                  onClick={() => userAction(user._id)}
                  className={
                    user.block ? "admin_unblock_btn" : "admin_block_btn"
                  }
                >
                  {user.block ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AdminUser;
