import React from 'react';

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
		}
	}

	renderBusy(){
		if (!this.props.isBusy){
			return;
		}
		return (
			<div className={`flex-center-container container-waiting`}
			>
				<p className="flex-center-item">Aguarde</p>
			</div>
		);
	}

	render() {
		return (
			<div style={{position: "relative"}}>
				<h3>SignUp</h3>
				{this.props.error}
				{this.renderBusy()}
				<div className="form-group">
					<label htmlFor="inputEmail3">Email</label>
					<input disabled={this.props.isBusy} 
						type="email" className="form-control" id="inputEmail3" placeholder="Email"
						onChange={(e) => this.setState({email: e.target.value,})}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputPassword3">Password</label>
					<input disabled={this.props.isBusy} type="password" className="form-control" id="inputPassword3" placeholder="Password"
						onChange={(e) => this.setState({password: e.target.value,})}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputPassword4">Confirm Password</label>
					<input 
						disabled={this.props.isBusy}
						type="password"
						className="form-control"
						id="inputPassword4"
						placeholder="type again you password"
						onChange={(e) => this.setState({confirmPassword: e.target.value,})}
					/>
				</div>

				<button
					disabled={this.props.isBusy || !this.state.email || !this.state.password || this.state.password != this.state.confirmPassword}
					type="submit"
					className="btn btn-primary"
					onClick={() => {
						// this.props.authActions.login({
						// 	email: this._email.value,
						// 	password: this._password.value,
						// });
					}}
				>
					Signup
				</button>
			</div>
		);
	}}

export default SignUp;
