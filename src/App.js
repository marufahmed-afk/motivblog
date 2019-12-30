import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Homepage from './components/homepage/Homepage'
import BlogList from './components/blogs/BlogList'
import BlogContent from './components/blogs/BlogContent'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Profile from './components/auth/Profile'
import Notifications from './components/homepage/Notifications'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="background">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/blogs/' component={BlogList} />
              <Route path='/blogs/:id' component={BlogContent} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/profile' component={Profile} />
              <Route path='/notifications' component={Notifications} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
