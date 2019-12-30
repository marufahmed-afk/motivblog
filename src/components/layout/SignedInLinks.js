import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) =>{
    return(
        <div className="navBar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/blogs">Posts</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/notifications">Notifications</NavLink></li>
                <li><NavLink to="/login" className='login' onClick={props.signOut}>Logout</NavLink></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(SignedInLinks)