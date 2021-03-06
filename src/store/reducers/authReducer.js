
const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return{
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login successs');
            return{
                ...state,
                authError:null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('sign out success');
            return state;
        case 'SIGOUT_ERROR':
            console.log('sign out failed');
            return{
                ...state,
                authError: 'signout failed'
            }
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup err')
            return{
                ...state,
                authError: action.err.message
            }
        case 'EDIT_ABOUT_SUCCESS':
            console.log('edit about success')
            return{
                ...state,
                authError: null
            }
        case 'EDIT_ABOUT_ERROR':
            console.log('edit about err')
            return{
                ...state,
                authError: action.err.message
            }
        default: 
            return state;
    }
}

export default authReducer