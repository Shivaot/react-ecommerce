import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
const ActivationPage = (props) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = props.match.params.token;
	useEffect(() => {
		document.getElementById("navbarDiv").style.display = "none";
		console.log(token);
		setLoading(true);
		axios
			.put(`customer/activate/${token}`)
			.then((response) => {
				setLoading(false);
				console.log(response);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.response.data.message);
				console.log(error);
			});
	}, [token]);

	const content = error ? (
		<div class="alert alert-danger" role="alert">
			{" "}
			{error}
		</div>
	) : (
		<div className="alert alert-success" role="alert">
			<h4 className="alert-heading">Well done!</h4>
			<p>Aww yeah, you successfully activated your account</p>
			<p className="mb-0">Whenever you need to, you can login now.</p>
		</div>
	);

	return <div>{loading ? <Spinner /> : content}</div>;
};

export default ActivationPage;
