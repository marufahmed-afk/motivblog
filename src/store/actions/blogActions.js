import { firestore } from '../../config/fbConfig'

export const createBlog = (blog) => {
    console.log(blog)
    return (dispatch, getState, { getFirebase }) => {

        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('blogs').add({
            ...blog,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_BLOG', blog });
        }).catch((err) => {
            dispatch({ type: 'CREATE_BLOG_ERROR', err});
        })
    }
};

export const likeBlog = (blog,id) =>{ 

    return (dispatch, getState)  => {
        const signedInUser = getState().firebase.auth.uid
        let updatedLikes;
        if(blog.likes.indexOf(signedInUser) ===-1){  
          updatedLikes = [...blog.likes, signedInUser] 
        } else {
          updatedLikes = blog.likes.filter(item => item!==signedInUser)
        }
        const updatedPost = {
            ...blog,
            likes: updatedLikes
        } 

        firestore.collection('blogs')
            .doc(id) 
            .set(updatedPost).then(() =>{dispatch({type:'ADD_LIKE_SUCCESS', blog});
                }).catch((err) => {dispatch({type:'ADD_LIKE_ERROR', err});
            })
      };
}