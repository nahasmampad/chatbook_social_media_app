import React from 'react'
import img from '../../svg/error.jpg'
import './errorPage.css'
import {useNavigate} from 'react-router-dom'

function ErrorPage() {
    const navigate= useNavigate()
  return (
    <div className='error_page'>
        <div className="error_page_container">
            <div className="error_page_left">
               <div className="div">
               <span className='err_st_code'>404</span>
                <div className="error_content">
                    <span>Whoops!</span>
                    <span>This page got lost <br/> in conversation</span>
                   <div onClick={()=>navigate('/')} className='error_page_btn'>Try again</div>
                </div>
               </div>
            </div>
            <div className="error_page_right">
                <img src={img} alt="" />
            </div>
        </div>

    </div>
  )
}

export default ErrorPage