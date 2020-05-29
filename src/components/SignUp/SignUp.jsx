import React, { Component } from 'react';

import './SignUp.styles.scss';
import FormInput from '../UI/FormInput/FormInput';
import CustomButton from '../UI/CustomButton/CustomButton';
import axios from '../../axios';
import Modal from '../UI/Modal/Modal';

class SignUp extends Component {
	state = {
		formData: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			contact: "",
        },
        loading: false,
        error: null,
		isRegistered: false,
		modalContent: "You successfully registered your account, Verify your account through the email received",
		isResend: true
	};

	submitHandler = (event) => {
        event.preventDefault();
        if (this.state.formData.password !== this.state.formData.confirmPassword) {
            this.setState({ error: "Password and Confirm Password do not match"});
            return;
		}
		this.setState({ error: null});
        this.setState({ loading : true});
		axios
			.post("customer/registration", this.state.formData)
			.then((response) => {
                this.setState({ loading: false});
                this.setState({ isRegistered: true});
				console.log(response);
			})
			.catch((error) => {
                this.setState({ loading: false});
                this.setState({ error: error.response.data.message });
				console.log(error.response.data.message);
			});
	};

	inputChangeHandler = (event) => {
		const { name, value } = event.target;
		let formData = { ...this.state.formData };
		formData = { ...formData, [name]: value };
		this.setState({ formData });
    };
    
    modalClosedHandler = () => {
        this.setState({isRegistered: false});
        this.setState({ formData: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			contact: "",
		}});
		this.setState({ modalContent: "You successfully registered your account, Verify your account through the email received"});
	}
	
	resendHandler = () => {
		axios.post('customer/re-sendActivation',{email: this.state.formData.email})
			.then(response => {
				console.log(response);
			})
			.catch(error => console.log(error));
		this.setState({ modalContent: "Activation link is re-sended"});
		this.setState({ isResend: false});
	}

	render() {
        let spinner = (
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				{this.state.error ? (
					<div className="alert alert-danger" role="alert">
						{this.state.error}
					</div>
				) : (
					<span>Sign Up with your email and password</span>
				)}
				<Modal
					show={this.state.isRegistered}
					modalClosed={this.modalClosedHandler}
                    color="#d4edda"
                    padding="0px"
				>
			
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>{this.state.modalContent}</p>
					{this.state.isResend ? <button type="button" className="btn btn-warning" onClick={this.resendHandler}>Re-send Link</button> : null }
                </div>
				</Modal>
				<form className="sign-up-form" onSubmit={this.submitHandler}>
					<FormInput
						type="text"
						name="firstName"
						value={this.state.formData.firstName}
						label="First Name"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="lastName"
						value={this.state.formData.lastName}
						label="Last Name"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="email"
						name="email"
						value={this.state.formData.email}
						label="Email"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="contact"
						value={this.state.formData.contact}
						label="Contact"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="password"
						name="password"
						value={this.state.formData.password}
						label="Password"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="password"
						name="confirmPassword"
						value={this.state.formData.confirmPassword}
						label="Confirm Password"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
                    {this.state.loading ? spinner : <CustomButton type="Submit">SIGN UP</CustomButton>}
				</form>
			</div>
		);
	}
}



export default SignUp;