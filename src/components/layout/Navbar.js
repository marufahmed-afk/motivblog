import React from 'react'
import '../../CSS/style.css'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) =>{
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    return(
        <nav>
            <div>
                <Link to='/' className='brand-logo'>MotivBlog</Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    //console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)

