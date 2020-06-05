import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

import classes from "./Navbar.module.css";
import SideBar from "../SideBar/SideBar";

const Navbar = (props) => {
	return (
		<div id="navbarDiv">
			<header className={classes.header}>
				<SideBar />
					<form style={{display: "flex"}}>
						<input type="text" name="search" placeholder="Search.." />
						<button type="button" className="btn btn-info" style={{marginLeft: "9px",height: "40px",marginTop: "3px"}}>Search</button>
					</form>
					
					<ul className={classes.mainNav}>
					<li> <NavLink to="/" exact className="link" activeStyle={{ color: 'orange' }}>HOME</NavLink> </li>
					{props.isAuthenticated ? <li> <NavLink to="/logout" activeStyle={{ color: 'orange' }} className="link">Logout</NavLink> </li> : <li> <NavLink to="/signin" activeStyle={{ color: 'orange' }} className="link">SIGNIN</NavLink> </li>}
					{props.isAuthenticated ? <li> <NavLink to="/cart" exact className="link" activeStyle={{ color: 'orange' }}><i className="fas fa-shopping-cart"> <span className="badge badge-light">{props.counter}</span></i></NavLink> </li>: null}
					{props.isAuthenticated ? <li> <NavLink to="/profile" exact className="link" activeStyle={{ color: 'orange' }}>Profile</NavLink> </li> : null}
				</ul>
			</header>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		counter: state.cart.counter
	}
}

export default connect(mapStateToProps)(Navbar);
