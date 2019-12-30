import React, { Component } from 'react'
import '../../CSS/login.css'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        if(auth.uid) return <Redirect to= '/blogs'/>
        return (
            <div>
                <div className="loginForm">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" id="email" onChange={this.handleChange} placeholder="Email"/>
                        <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
                        <button type="submit">Login</button>
                        <Link to="/signup"><button>Sign Up</button></Link>
                    </form>
                    <div>
                        { authError ? <p>{ authError }</p> : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)