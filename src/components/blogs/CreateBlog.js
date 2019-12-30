import React, { Component } from 'react'
import { conenct, connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../../store/actions/blogActions'
import { Redirect } from 'react-router-dom'
import { storage } from '../../config/fbConfig'

class CreateBlog extends Component {
    state = {
        title: '',
        content: '',
        image: null,
        url: '',
        likes: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createBlog(this.state)
        this.props.history.push('/');
        //console.log(this.props)
    }

    handleUpload = () => {
        const { image } = this.state;
        const imageName = image.name;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
          "state_changed",
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

    openForm = () => {
        document.getElementById("upload-form").style.display = "block";
      }
    closeForm = () => {
        document.getElementById("upload-form").style.display = "none";
      }
    render() {
        console.log(this.props)
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="addPost">
                <p>Add Post</p>
                <div className="addNewPost">
                    <div className='open-button' >
                        <a  href='#' onClick={this.openForm}><img src={require("../../images/blueCircle.svg")} alt="" /></a>
                    </div>
                    <div className='upload-pop' id='upload-form'>
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
                        <button type="button" className="form-button" onClick={this.closeForm}>Close</button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="title" placeholder="Title" onChange={this.handleChange} />
                        <textarea className="smallPost" id='content' onChange={this.handleChange} placeholder="Start writing your blog here!"></textarea>
                        <button className="form-button" type="submit">Create</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (blog) => dispatch(createBlog(blog))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)