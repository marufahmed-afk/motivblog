import React from 'react'
import {Component} from 'react'
import '../../CSS/singlePost.css'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {likeBlog} from '../../store/actions/blogActions'



class  BlogContent extends Component{

    handleLike = () => {
        this.props.likeBlog(this.props.blog, this.props.match.params.id)
    }

    render(){
        const { blog, auth } = this.props;
        if(!auth.uid) return <Redirect to= '/login'/>
        if (blog) {
            return (
                <div>
                    <main className="singlePost">
                        <div className="container">
                            <div className="title">
                                <h1>{blog.title}</h1>
                            </div>
                            <h4>Posted by {blog.authorFirstName} {blog.authorLastName} {moment(blog.createdAt.toDate()).calendar()}</h4>
                            <button onClick={this.handleLike}>Like</button>
                            <p>{blog.content}</p>
                        </div>
                    </main>
                </div>
            )
        } else {
            return (
                <p>Loading Project</p>
            )
        }
    }
    
}

const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id;
    const blogs = state.firestore.data.blogs;
    const blog = blogs ? blogs[id] : null
    return {
        blog: blog,
        auth: state.firebase.auth
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        likeBlog: (blog,id) => dispatch(likeBlog(blog,id))
    };
}

export default compose(
    connect(mapStateToProps,matchDispatchToProps),
    firestoreConnect([
        { collection: 'blogs' }
    ])
)(BlogContent)