import React, { Component } from "react";
export default class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        pass: '',
        confirm: '',
        error: {
            nameError: '',
            emailError: '',
            passError: '',
            confirmError: '',
        },
        formValid: false
    }

    validateName = (name = name.trim()) => {
        let error = '';

        if (name === '') {
            error = 'This field is required';
        }
        else {
            error = '';
        }

        return error;
    }
    validateEmail = (email = email.trim()) => {
        let error = '';
        var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '') {
            error = 'This field is required';
        }
        else if (!pattern.test(email)) {
            error = 'Please enter valid email';
        }
        else {
            error = '';
        }

        return error;
    }
    validatePassword = (pass = pass.trim()) => {
        let error = '';

        if (pass === '') {
            error = 'This field is required';
        }
        else if (pass.length < 6) {
            error = 'Must be greater than 5 characters';
        }
        else {
            error = '';
        }

        return error;
    }
    validateConfirmPass = (confirm = confirm.trim()) => {
        let error = '';
        if (confirm === '') {
            error = 'This field is required';
        }
        else if (confirm != this.state.pass) {
            error = 'Password must be same';
        }
        else {
            error = '';
        }

        return error;
    }
    handleChange = (e) => {
        const error = this.validateOnChange(e);

        this.setState({
            [e.target.id]: e.target.value,
            error
        });
    }

    validateOnChange = (e) => {
        let error = this.state.error;
        if (e.target.id === 'name') {
            error.nameError = this.validateName(e.target.value);
        }
        if (e.target.id === 'pass') {
            error.passError = this.validatePassword(e.target.value);
        }
        if (e.target.id === 'confirm') {
            error.confirmError = this.validateConfirmPass(e.target.value);
        }
        if (e.target.id === 'email') {
            error.emailError = this.validateEmail(e.target.value);
        }
        return error;
    }

    validateOnSubmit = () => {
        return (
            this.validateName(this.state.name) == '' &&
            this.validatePassword(this.state.pass) == '' &&
            this.validateConfirmPass(this.state.confirm) == '' &&
            this.validateEmail(this.state.email) == ''
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let formValid = this.validateOnSubmit();
        console.log(formValid)
        if (formValid) {
            this.setState({
                name: '',
                email: '',
                pass: '',
                confirm: '',
                formValid: true
            });
        }
    }
    render() {
        return (
            <>
                {
                    this.state?.formValid && 
                    <div class="alert alert-success" role="alert">
                        Registration success!
                    </div>
                }
                
                <form className="mx-1 mx-md-4" onSubmit={this.handleSubmit}>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <label className="form-label" htmlFor="name">
                                Your Name
                            </label>
                            <p className="text-danger">{this.state.error.nameError}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <label className="form-label" htmlFor="email">
                                Your Email
                            </label>
                            <p className="text-danger">{this.state.error.emailError}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <input
                                type="password"
                                id="pass"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <label className="form-label" htmlFor="pass">
                                Password
                            </label>
                            <p className="text-danger">{this.state.error.passError}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <input
                                type="password"
                                id="confirm"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <label className="form-label" htmlFor="confirm">
                                Repeat your password
                            </label>
                            <p className="text-danger">{this.state.error.confirmError}</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" >
                            Register
                        </button>
                    </div>

                </form>
            </>
        );
    }
}