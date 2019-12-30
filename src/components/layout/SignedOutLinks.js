import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SignedOutLinks = () =>{
    return(
        <div className="navBar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/blogs">Posts</NavLink></li>
                <li><NavLink to="/notifications">Notifications</NavLink></li>
                <li><NavLink to="/login" className='login'>Login</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks