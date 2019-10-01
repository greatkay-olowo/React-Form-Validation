import React, { Component } from "react";
import "./App.css";

const formValid = formErrors => {
	let valid = true;

	Object.values(formErrors).forEach(val => {
		val.length > 0 && (valid = false);
	});
	return valid;
};

const emailRegex = RegExp(/\S+@\S+\.\S+/);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			formErrors: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			},
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		if (
			this.state.firstName === null ||
			this.state.lastName === null ||
			this.state.email === null ||
			this.state.password === null
		) {
			alert("All the fields are compulsory");
		} else if (formValid(this.state.formErrors)) {
			console.log(`
        --SUBMITTING--
        first Name: ${this.state.firstName}
        last Name: ${this.state.lastName}
        Email: ${this.state.email}
        password: ${this.state.password}
      `);
		} else {
			alert("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
	};

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = this.state.formErrors;

		switch (name) {
			case "firstName":
				formErrors.firstName =
					value.length < 3 ? "minimum 3 character required" : "";
				break;
			case "lastName":
				formErrors.lastName =
					value.length < 3 ? "minimum 3 character required" : "";
				break;
			case "email":
				formErrors.email = emailRegex.test(value)
					? ""
					: "invalid Email address";
				break;
			case "password":
				formErrors.password =
					value.length < 6 ? "minimum 6 character required" : "";
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors } = this.state;
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Create Account</h1>

					<form onSubmit={this.handleSubmit} noValidate>
						<div className="firstName">
							<label htmlFor="firstName">First Name</label>
							<input
								className={formErrors.firstName.length > 0 ? "error" : null}
								placeholder="First Name"
								type="text"
								name="firstName"
								noValidate
								onChange={this.handleChange}
							/>
						</div>
						{formErrors.firstName.length > 0 && (
							<span className="errorMessage">{formErrors.firstName}</span>
						)}

						<div className="lastName">
							<label htmlFor="lastName">Last Name</label>
							<input
								className={formErrors.lastName.length > 0 ? "error" : null}
								placeholder="Last Name"
								type="text"
								name="lastName"
								noValidate
								onChange={this.handleChange}
							/>
						</div>
						{formErrors.lastName.length > 0 && (
							<span className="errorMessage">{formErrors.lastName}</span>
						)}

						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								className={formErrors.email.length > 0 ? "error" : null}
								placeholder="Email"
								type="email"
								name="email"
								noValidate
								onChange={this.handleChange}
							/>
						</div>
						{formErrors.email.length > 0 && (
							<span className="errorMessage">{formErrors.email}</span>
						)}

						<div className="password">
							<label htmlFor="password">password</label>
							<input
								className={formErrors.password.length > 0 ? "error" : null}
								placeholder="password"
								type="password"
								name="password"
								noValidate
								onChange={this.handleChange}
							/>
						</div>
						{formErrors.password.length > 0 && (
							<span className="errorMessage">{formErrors.password}</span>
						)}

						<div className="createAccount">
							<button type="submit">Create Account</button>
							<small>Already Have an Account?</small>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
