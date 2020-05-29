import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import BackDrop from "../UI/Backdrop/Backdrop";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import axios from "../../axios";

import classes from './Sidebar.module.css';

const SideBar = (props) => {
	const [sideBar, setSidebar] = useState({ display: "none" });
	const [backDrop, setBackDrop] = useState(false);
	const { onFetchCategories, token, isAuthenticated } = props;

	useEffect(() => {
		if (isAuthenticated) {
			onFetchCategories(token);
		}
	}, [onFetchCategories, token, isAuthenticated]);

	const sideBarClose = () => {
		setSidebar({ display: "none" });
		setBackDrop(false);
	};

	const sideBarOpen = () => {
		setSidebar({
			backgroundColor: "white",
			display: "inline",
			width: "300px",
			height: "1000px",
			marginTop: "22%",
		});
		setBackDrop(true);
		onFetchCategories(token);
	};

	const categoryHandler = (categoryId) => {
		onFetchCategories(token, categoryId);
	};

	let spinner = (
		<div
			className="spinner-border"
			style={{ width: "3rem", height: "3rem" }}
			role="status"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);

	const redirectHandler = () => {
		sideBarClose();
		props.history.replace("/signin");
	};

	const productViewHandler = () => {
		props.history.push("/category/" + props.currId);
		sideBarClose();
	};

	const categoryNavigator = () => {
		var prevCatId;
		const headers = {
			Authorization: "Bearer" + token,
		};
		let query = "";
		if (props.currId) {
			query = `?categoryId=${props.currId}`;
		}
		axios
			.get("customer/profile/categories" + query, { headers: headers })
			.then((response) => {
				console.log(response.data[0].parentId.id);
				prevCatId = response.data[0].parentId.id;
				console.log(prevCatId);
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});
		onFetchCategories(token, prevCatId);
	};

	let content = props.error
		? props.error
		: props.categories.map((category) => (
				<li
					key={category.id}
					className="list-group-item d-flex justify-content-between align-items-center"
				>
					{category.name}
					<span
						className="badge badge-primary badge-pill"
						onClick={() => categoryHandler(category.id)}
					>
						<i className="fas fa-chevron-right"></i>
					</span>
				</li>
		  ));

	let sideBarClass = ["w3-sidebar w3-bar-block",classes.sidebar];

	return (
		<>
			<BackDrop show={backDrop} clicked={sideBarClose} />
			<span
				className="w3-button  w3-xlarge"
				style={{ width: "50px" }}
				onClick={sideBarOpen}
			>
				☰
			</span>
			<div
				className={sideBarClass.join(" ")}
				style={{ ...sideBar, overflowY: "scroll", maxHeight: "100vh" }}
				id="mySidebar"
			>
				<button
					onClick={sideBarClose}
					className="w3-bar-item w3-button w3-large"
					style={{ marginTop: "5px" }}
				>
					Close &times;
				</button>
				{!props.isAuthenticated ? (
					<span className="btn btn-danger" onClick={redirectHandler}>
						Sign in To Continue
					</span>
				) : props.loading ? (
					spinner
				) : (
					<ul className="list-group">{content}</ul>
				)}
				{props.categories.length === 0 && props.isAuthenticated ? (
					<span onClick={productViewHandler}>
						<i className="fa fa-eye" aria-hidden="true">
							View
						</i>
					</span>
				) : null}
				{props.isAuthenticated &&
				props.currId &&
				props.categories.length !== 0 ? (
					<span style={{ fontSize: "2rem" }} onClick={categoryNavigator}>
						<i className="fas fa-chevron-circle-left"></i>
					</span>
				) : null}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		isAuthenticated: state.auth.token !== null,
		categories: state.categories.categories,
		loading: state.categories.loading,
		error: state.categories.error,
		currId: state.categories.currId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchCategories: (token, categoryId) =>
			dispatch(actions.fetchCategories(token, categoryId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
