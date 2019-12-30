import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux' 
import rootReducer from './store/reducers/rootReducer'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import fbConfig from './config/fbConfig'
import firebase from './config/fbConfig'

const store = createStore(rootReducer,

    applyMiddleware(thunk.withExtraArgument({getFirebase}))

);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}


const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children
}

ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><AuthIsLoaded><App /></AuthIsLoaded></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
