import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage';
import NavBar from './views/NavBar/NavBar';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import ProfileEditPage from './views/ProfileEditPage/ProfileEditPage';
import MovieDetailPage from './views/MovieDetailPage/MovieDetailPage';
import FavoritePage from './views/FavoritePage/FavoritePage';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '64px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path='/' component={Auth(LandingPage, null)} />
        <Route exact path='/login'component={Auth(LoginPage, false)} />
        <Route exact path='/register' component={Auth(RegisterPage, false)} />
        <Route exact path='/profile/edit' component={Auth(ProfileEditPage, true)} />
        <Route exact path='/movie/:movieId' component={Auth(MovieDetailPage, null)} />
        <Route exact path='/favorite' component={Auth(FavoritePage, true)} />
      </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
