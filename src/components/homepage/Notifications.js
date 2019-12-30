import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

function Notifications(props) {
    console.log(props)
    const { auth, notificaitons } = props;
    if(!auth.uid) return <Redirect to= '/login'/>
    if (true) {
        return (
            <div className="notifications">
                <ul>
                    { notificaitons && notificaitons.map(noti => {
                        return(
                            <li key={noti.id}>
                                <span>{noti.user }</span>
                                <span> { noti.content}</span>
                                <div>
                                    {moment(noti.time.toDate()).fromNow()}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <p>Loading Project</p>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        notificaitons: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'notifications', limit: 3 }
    ])
)(Notifications)