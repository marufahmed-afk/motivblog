import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BlogShowcase from '../blogs/BlogShowcase'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


class Homepage extends Component {
  render(){
    const { blogs, auth } = this.props;
    return (
        
    <main className="mainBlock">

      <div className="topPosts">
          <p>Top Posts</p>
      </div>
      
      <BlogShowcase blogs = {blogs}/>
        
    </main>
    );
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
)(Homepage)

