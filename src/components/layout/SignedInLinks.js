import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) =>{
    return(
        <div className="navBar">
            <ul>
                <li><NavLink to="/" activeClassName="null">Home</NavLink></li>
                <li><NavLink to="/blogs" activeClassName="active">Posts</NavLink></li>
                <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
                <li><NavLink to="/notifications" activeClassName="active">Notifications</NavLink></li>
                <li><NavLink to="/login" activeClassName="active" className='login' onClick={props.signOut}>Logout</NavLink></li>
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