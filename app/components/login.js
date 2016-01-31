import React,
 { PropTypes, } from 'react';

const style = require('app/css/default.scss');

export default class Login extends React.Component {
	static propTypes = {
		authActions: PropTypes.shape({
			login: PropTypes.func.isRequired,
		}).isRequired,
		isBusy: PropTypes.bool,
		error: PropTypes.string,
	};

	componentDidMount() {
		this._email.focus();
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
				<h3>Login</h3>
				{this.props.error}
				{this.renderBusy()}
				<div className="form-group">
					<label htmlFor="inputEmail3">Email</label>
					<input defaultValue="test@test.com" disabled={this.props.isBusy} type="email" className="form-control" id="inputEmail3" placeholder="Email"
						ref={(input) => this._email = input}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputPassword3">Password</label>
					<input defaultValue="123" disabled={this.props.isBusy} type="password" className="form-control" id="inputPassword3" placeholder="Password"
						ref={(input) => this._password = input}
					/>
				</div>

				<button
					disabled={this.props.isBusy}
					type="submit"
					className="btn btn-primary"
					onClick={() => {
						this.props.authActions.login({
							email: this._email.value,
							password: this._password.value,
						});
					}}
				>
					Login
				</button>
			</div>
		);
	}
}
