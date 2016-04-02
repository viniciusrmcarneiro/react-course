import React,
 { PropTypes, } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class SignUp extends React.Component {
    static propTypes = {
        actions: PropTypes.shape({
            signup: PropTypes.func.isRequired,
            gotoLogin: PropTypes.func.isRequired,
        }).isRequired,

        info: PropTypes.shape({
            isBusy: PropTypes.bool,
            error: PropTypes.string,
            success: PropTypes.bool,
        }).isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    renderBusy(){
        if (!this.props.info.isBusy){
            return;
        }
        return (
            <div className={`flex-center-container container-waiting`}>
                <p className="flex-center-item">Aguarde</p>
            </div>
        );
    }

    renderError(){
        if (!this.props.info.error){
            return null;
        }

        return (
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span className="sr-only">Error:</span>
                  {(this.props.info.exception && this.props.info.exception.data && this.props.info.exception.data.message)  || this.props.info.error}
                </div>
        );
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <Modal
                    bsSize="lg"
                    backdrop={true}
                    show={this.props.info.success == true}
                    autoFocus={true}
                    keyboard={true}
                >
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        CADASTRO REALIZADO COM SUCESSO.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={::this.props.actions.gotoLogin}>OK</Button>
                    </Modal.Footer>
                </Modal>

                <div  style={{marginBottom: 10}}>
                    <h3>SignUp</h3>
                    {this.renderBusy()}
                    <div className="form-group">
                        <label htmlFor="inputEmail3">Email</label>
                        <input disabled={this.props.info.isBusy} 
                            type="email" className="form-control" id="inputEmail3" placeholder="Email"
                            onChange={(e) => this.setState({email: e.target.value,})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3">Password</label>
                        <input disabled={this.props.info.isBusy} type="password" className="form-control" id="inputPassword3" placeholder="Password"
                            onChange={(e) => this.setState({password: e.target.value,})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword4">Confirm Password</label>
                        <input 
                            disabled={this.props.info.isBusy}
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            placeholder="type again you password"
                            onChange={(e) => this.setState({confirmPassword: e.target.value,})}
                        />
                    </div>

                    <button
                        disabled={this.props.info.isBusy || !this.state.email || !this.state.password || this.state.password != this.state.confirmPassword}
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            transition: "opacity 0.3s linear"
                        }}
                        onClick={() => {
                            this.props.actions.signup({
                                email: this.state.email,
                                password: this.state.password,
                            });
                        }}
                    >
                        Signup
                    </button>
                </div>
                {this.renderError()}
            </div>
        );
    }}

export default SignUp;
