import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/posts.css'
import BlogCard from './BlogCard'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class BlogList extends Component {

    state = {
        filter: ''
    }

    handleFilter = (e) =>{
        console.log(e.target.id)
        this.setState({
            filter: e.target.id
        })
    };

    render(){
    
    const { blogs, auth } = this.props;
    if(!auth.uid) return <Redirect to= '/login'/>
    return (

        <div>
            <div className="filters">
                <ul>
                    <li ><a href='#' id = 'All' onClick = {this.handleFilter}>All</a></li>
                    <li><Link to="#date">Date</Link></li>
                    <li ><a href='#' id = 'Liked' onClick = {this.handleFilter}>Liked</a></li>
                    <li><Link to="#rating">Rating</Link></li>
                </ul>
            </div>

            <div className="posts">
                <ul>
                    { blogs && blogs.map(blog =>{
                        if(this.state.filter === 'Liked'){
                            if(blog.likes.length >= 1){
                                return(
                                <Link to={'/blogs/' + blog.id} key= {blog.id}>
                                    <BlogCard blog={blog}/>
                                </Link>
                             )
                            }
                        }
                        else {
                            return(
                            
                            <Link to={'/blogs/' + blog.id} key= {blog.id}>
                                <BlogCard blog={blog}/>
                            </Link>
                        )
                        }
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
