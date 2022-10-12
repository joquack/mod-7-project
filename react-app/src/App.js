import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Dashboard from './components/Dashboard';
import { authenticate } from './store/session';
import ChannelList from './components/Channels/Channels';
import ServerHome from './components/Servers/ServerHome';
import SplashPage from './components/SplashPage/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true}>
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/me' exact={true}>
          <Dashboard />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/:serverId' exact={true}>
          <ServerHome />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/:serverId/:channelId' exact={true}>
          <ChannelList />
        </ProtectedRoute>

        <Route path=''>
          <h1>404 Page Not Found</h1>
        </Route>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
