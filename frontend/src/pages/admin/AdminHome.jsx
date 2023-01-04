import React from 'react'
import { useNavigate } from 'react-router-dom'


function AdminHome({users, posts}) {
  const navigate = useNavigate()
  return (
    <div className='admin_home_page'>
      <div className="admin_home_container">
        <div className="admin_home_card">
          <div className="card_head">
            TOTAL USERS
          </div>

          <div className="total_item_count">
            {users}
          </div>
          <div className="view_Details_btn">
              <button onClick={()=>navigate("/admin/users")}>View Details</button>
          </div>
        </div>

        <div className="admin_home_card">
          <div className="card_head">
            TOTAL POSTS
          </div>

          <div className="total_item_count">
            {posts}
          </div>
          <div className="view_Details_btn">
              <button onClick={()=>navigate("/admin/posts")}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome