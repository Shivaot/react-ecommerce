import React from 'react';
import { NavLink } from 'react-router-dom';

import './AuthPage.styles.scss';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
const AuthPage = () => {
    return (
      <>
            <div> <NavLink to="/seller-login" exact className="link" activeStyle={{ color: 'orange' }} style={{marginLeft: "80%"}}>Login as Seller</NavLink> </div>
            <div className="auth-page">
                <SignIn />
                <span style={{borderRight: "2px solid grey"}}></span>
                <SignUp />
            </div> 
      </>     
    );
};

export default AuthPage;