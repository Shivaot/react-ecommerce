import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import ActivationPage from './pages/ActivationPage/ActivationPage';
import Logout from './pages/AuthPage/Logout/Logout';
import ProductPage from '../src/pages/ProductPage/ProductPage';
import * as actions from './store/actions/index';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword';
import ChangePassword from './pages/ForgotPasswordPage/ChangePassword';

function App(props) {
  const { onAutoSignIn } = props;
  
  useEffect(() => {  
    onAutoSignIn();
  }, [onAutoSignIn]);


  let routes = (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={AuthPage} />
      <Route exact path="/customer/activate/:token" component={ActivationPage} />
      <Route exact path="/category/:id" component={ProductPage} />
      <Route exact path="/product/details/:id" component={ProductDetailPage} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/changePassword" component={ChangePassword} />
      <Route path='/seller-login' component={() => { 
      window.location.href = 'https://www.google.in'; 
      return null;
      }}/>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={AuthPage} />
        <Route exact path="/customer/activate/:token" component={ActivationPage} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/category/:id" component={ProductPage} />
        <Route exact path="/product/details/:id" component={ProductDetailPage} />
        <Route exact path="/cart" component={CheckoutPage} />
        <Route exact path="/profile" component={UserProfilePage} />
        <Redirect to="/" />
    </Switch>
    );
  }
  // if (condition) {
  //   // return...
  // }
  return (
    <div className="App">
      <Navbar />
        {routes}
      </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
