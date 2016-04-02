import React,
 { PropTypes, } from 'react';

export default class Login extends React.Component {
    static propTypes = {
        authActions: PropTypes.shape({
            login: PropTypes.func.isRequired,
        }).isRequired,

        loginInfo: PropTypes.shape({
            isBusy: PropTypes.bool,
            error: PropTypes.string,
        }).isRequired,

        defaultEmail: PropTypes.string,
    };

    componentDidMount() {
        this._email.focus();
    }

    renderBusy(){
        if (!this.props.loginInfo.isBusy){
            return;
        }
        return (
            <div className={`flex-center-container container-waiting`}>
                <p className="flex-center-item">Aguarde</p>
            </div>
        );
    }

    renderError(){
        if (!this.props.loginInfo.error){
            return null;
        }

        return (
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span className="sr-only">Error:</span>
                  {(this.props.loginInfo.exception && this.props.loginInfo.exception.data && this.props.loginInfo.exception.data.message)  || this.props.loginInfo.error}
                </div>
        );
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <div  style={{marginBottom: 10}}>
                    <h3>Login</h3>
                    {this.renderBusy()}
                    <div className="form-group">
                        <label htmlFor="inputEmail3">Email</label>
                        <input defaultValue={this.props.loginInfo.defaultEmail} disabled={this.props.loginInfo.isBusy} type="email" className="form-control" id="inputEmail3" placeholder="Email"
                            ref={(input) => this._email = input}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3">Password</label>
                        <input disabled={this.props.loginInfo.isBusy} type="password" className="form-control" id="inputPassword3" placeholder="Password"
                            ref={(input) => this._password = input}
                        />
                    </div>

                    <button
                        disabled={this.props.loginInfo.isBusy}
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
                {this.renderError()}
            </div>
        );
    }
}
