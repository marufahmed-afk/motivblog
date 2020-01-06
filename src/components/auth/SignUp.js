import React, { Component } from 'react'
import '../../CSS/login.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { storage } from '../../config/fbConfig'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        image: null,
        url: ''
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();

        this.props.signUp(this.state)

    }
    handleImageChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
    };
    handleUpload = (e) => {
        e.preventDefault();
        const { image } = this.state;
        const imageName = image.name;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          error => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
                console.log(this.state);
              });
          }
          
        );

        this.setState(() => ({ image: imageName}));
      };

    render() {
        const { authError, auth } = this.props;
        if(auth.uid) return <Redirect to= '/'/>
        return (
            <div>
                <div className="loginForm">
                    <h2>Join Us</h2>
                    <form type="submit" onSubmit={this.handleSubmit}>
                        <input type="text" id="firstName" onChange={this.handleChange} placeholder="First Name"/>
                        <input type="text" id="lastName" onChange={this.handleChange} placeholder="Last Name"/>
                        <input type="email" id="email" onChange={this.handleChange} placeholder="Email"/>
                        <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
                        <input type="password" id="confirm" onChange={this.handleChange} placeholder="Confirm Password"/>
                        <input type="text" id="occupation" onChange={this.handleChange} placeholder="Occupation"/>
                        <div className="file-field input-field">
                            <div className="btn">
                                <input type="file" id="image" onChange={this.handleImageChange} />
                            </div>
                        </div>
                        <button
                            onClick={this.handleUpload}
                            className="upload-btn"
                            >
                            Upload
                        </button>
                        <button type="submit">Sign Up</button>
                        <div>
                            { authError ? <p>{ authError }</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)