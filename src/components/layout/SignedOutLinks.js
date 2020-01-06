import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SignedOutLinks = () =>{
    return(
        <div className="navBar">
            <ul>
                <li><NavLink to="/" activeClassName="null">Home</NavLink></li>
                <li><NavLink to="/blogs" activeClassName="active">Posts</NavLink></li>
                <li><NavLink to="/notifications" activeClassName="active">Notifications</NavLink></li>
                <li><NavLink to="/login" activeClassName="active" className='login'>Login</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks