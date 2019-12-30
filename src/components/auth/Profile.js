import React from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/profile.css'
import CreateBlog from '../blogs/CreateBlog'
import BlogShowcase from '../blogs/BlogShowcase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'


function Profile(props) {
    //console.log(props);
    const { blogs, users, auth } = props;
    
    if (!auth.uid) return <Redirect to='/login' />
    const user = users && users.find(user =>{
        
        if(user.id == auth.uid){
            //console.log(user.id)
            return( 
            user
        )
        }
    });
    return (
        
        <div className="profile">
        <CreateBlog history={props.history}/>
        <div className="userInfo">
            <div className="user">
                <Link to="" ><img className='user-img' src={user && user.url} alt="" /></Link>
                <section>
                    <p id="name">{user && user.firstName } {user && user.lastName} </p>
                    <p id="occupation">{user && user.occupation || 'NA'}</p>
                    <p id="email">{auth.email}</p>
                </section>
            </div>
        </div>

        <div className="prevPosts">
            <div className="topPosts">
                <p>Top Posts</p>
            </div>

            
            <BlogShowcase/>
        
        </div>


        <div className="userAbout">
            <div className="aboutMe">
                <section>
                    <p id="aboutUser">About Me:</p>
                    <p id="aboutMeText">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.</p>
                </section>
                
            </div>
        </div>
        </div>
    )
}


const mapStateToProps = (state) =>{
    return {
    blogs: state.firestore.ordered.blogs,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'blogs' },
        { collection: 'users'}
    ])
)(Profile)
