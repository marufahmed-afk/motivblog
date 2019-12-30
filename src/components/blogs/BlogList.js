import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/posts.css'
import BlogCard from './BlogCard'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class BlogList extends Component {

    render(){
    
    const { blogs, auth } = this.props;
    if(!auth.uid) return <Redirect to= '/login'/>
    return (

        <div>
            <div className="filters">
                <ul>
                    <li><Link to="#home">All</Link></li>
                    <li><Link to="#date">Date</Link></li>
                    <li><Link to="#liked">Liked</Link></li>
                    <li><Link to="#rating">Rating</Link></li>
                </ul>
            </div>

            <div className="posts">
                <ul>
                    { blogs && blogs.map(blog =>{
                        {/* {console.log(blog)} */}
                        return(
                            
                            <Link to={'/blogs/' + blog.id} key= {blog.id}>
                                <BlogCard blog={blog}/>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </div>

    )

    }
    
}

const mapStateToProps = (state) =>{
    return {
    blogs: state.firestore.ordered.blogs,
    auth: state.firebase.auth
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'blogs' }
    ])
)(BlogList)
