import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/profile.css'
import CreateBlog from '../blogs/CreateBlog'
import BlogShowcase from '../blogs/BlogShowcase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { editAbout } from '../../store/actions/authActions'



const Profile = (props) => {

    const [about, setAbout] = useState('')

    const openForm = () => {
        document.getElementById("about-form").style.display = "flex";
    }
    const closeForm = () => {
        document.getElementById("about-form").style.display = "none";
    }

    const handleAbout = (e) => {
        setAbout(e.target.value);
        //console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editAbout(props.users, about);
    }
    
    console.log(props);
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
                <Link to="" ><img className='user-img' src={user && user.url || null} alt="" /></Link>
                <section>
                    <p id="name">{user && user.firstName || 'NA' } {user && user.lastName || 'NA'} </p>
                    <p id="occupation">{user && user.occupation || 'NA'}</p>
                    <p id="email">{auth.email}</p>
                </section>
            </div>
        </div>

        <div className="prevPosts">
            <div className="topPosts">
                <p>Top Posts</p>
            </div>

            
            <BlogShowcase  blogs = {blogs}/>
        
        </div>

        <div className="userAbout">
            <div className="aboutMe">
                <section>
                    <p id="aboutUser">About Me:</p>
                    <button className='edit-btn' onClick={openForm}>+</button>
                    <p id="aboutMeText">{user && user.about}</p>
                </section>
                <div className='about-pop' id='about-form'>
                    <form onSubmit={handleSubmit}>
                        <textarea type="text" id="edit-text" onChange={handleAbout} />
                        <button type="Submit" className="buttonBlue edit-form-button">Update</button>
                    </form>  
                    <button type="button" className="buttonBlue close-form-button" onClick={closeForm}>Close</button>
                </div>
            </div>
        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        editAbout: (id,about) => dispatch(editAbout(id,about))
    };
}


const mapStateToProps = (state) =>{
    return {
    blogs: state.firestore.ordered.blogs,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'blogs' },
        { collection: 'users'}
    ])
)(Profile)
