import { firestore } from '../../config/fbConfig'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR',err });
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        }).catch(err => {
            dispatch({ type:'SIGOUT_ERROR', err})
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {

            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                occupation: newUser.occupation,
                url: newUser.url
            })
        }).then(() => {
            dispatch({ type:'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type:'SIGNUP_ERROR', err})
        })
    }
}