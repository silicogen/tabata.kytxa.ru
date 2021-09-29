import React from 'react';
import { Router, Switch, Route, useRouteMatch } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatePost from './components/posts/CreatePost';
import Dashboard from './components/Dashboard';
import { history } from './history'
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword.js';
import ResetPassword from './components/users/ResetPassword';
import PostDetails from './components/posts/PostDetails'
import AuthPosts from './components/posts/AuthPosts'



const Routes = () => {
  let { path } = useRouteMatch();
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path={path} component={Dashboard} />
          <Route path={`${path}/login`} component={Login} />
          <Route path={`${path}/signup`} component={Register} />
          <Route path={`${path}/createpost`} component={CreatePost} />
          <Route path={`${path}/profile/:id`} component={Profile} />
          <Route path={`${path}/forgotpassword`} component={ForgotPassword} />
          <Route path={`${path}/resetpassword/:token`} component={ResetPassword} />
          <Route path={`${path}/posts/:id`} component={PostDetails} />
          <Route path={`${path}/authposts`} component={AuthPosts} />
        </Switch>
      </div>
    </Router>

  );
}

export default Routes;

