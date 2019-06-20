import React from 'react';

import {Row, Col, Input, Button, CardPanel} from 'react-materialize';
import './SignUp.css'
import {isName, isEmail, isPassword} from '../../FormValidate';

class SignUp extends React.Component
{ 
	constructor(props) 
	{
		super(props);
		this.state = {
			signUpEmail: '',
			signUpPassword: '',
			signUpConfPassword: '',
			signUpName: '',
			showError: false,
			message: ''
		}
	}

	onEmailChange = (event) => 
	{
		this.setState({signUpEmail: event.target.value});
	}

	onPasswordChange = (event) => 
	{
		this.setState({signUpPassword: event.target.value});
	}

	onConfPasswordChange = (event) => 
	{
		this.setState({signUpConfPassword: event.target.value});
	}

	onNameChange = (event) => 
	{
		this.setState({signUpName: event.target.value});
	}

	validate = () => {



		// {signUpEmail, signUpPassword, signUpName} = this.state;

		// //Email
		// const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// emailRes = re.test(email);
		let valid = true;
		let message = '';

		if(!isName(this.state.signUpName))
		{
			valid = false;
			message = message + '\nName Invalid';
		}

		if(!isEmail(this.state.signUpEmail))
		{
			valid = false;
			message = message + '\nEmail Invalid';
		}
		
		if(!isPassword(this.state.signUpPassword))
		{
			valid = false;
			message = message + '\nPassword should be 8-16 char long.';
		}


		if(!(this.state.signUpConfPassword === this.state.signUpPassword))
		{
			valid = false;
			message = message + '\nPasswords do not match';
		}

		if(!valid)
		{
			let newMessageText = message.split('\n').map ((item, i) => <p key={i}>{item}</p>);

			this.setState({showError: !valid, message: newMessageText});
		}
		else
		{
			this.setState({showError: !valid});
		}
		return valid;
	}

	onSubmitSignUp = () =>
	{
		if(this.validate())
		{
			fetch('http://localhost:3001/signup', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
					email: this.state.signUpEmail,
					password: this.state.signUpPassword,
					name: this.state.signUpName
				})
			})
			 .then(response => response.json())
			 .then(user => {
			 	if(user)
			 	{
			 		console.log(user);
			 		this.props.onRouteChange('signupSuccess');
			 	}
			 	else
			 	{
			 		this.setState({showError: true, message: 'Error Signing Up!'})
			 	}
			 });
		}
		
	}

	render()
	{
		return(

			<Row className='ma4'>
			    <Col s={12} className='display-center'>
			        <CardPanel className="center color-primary">
			          
			           		<h4>Sign Up</h4>
			           		{ this.state.showError ? <div className="error-message">{this.state.message}</div> : null }
				            <Input onChange={this.onNameChange} s={12} l={12} type='text' label='Name' />
				            <Input onChange={this.onEmailChange} s={12} l={12} type='email' label='Email' />
				            <Input onChange={this.onPasswordChange} s={12} l={6} type='password' label='Password' />
				            <Input onChange={this.onConfPasswordChange} s={12} l={6} type='password' label='Confirm Password' />
				            <Button onClick={this.onSubmitSignUp} large waves='light' className='bg-color-secondary'>Sign Up</Button>
				            <br />
				            <p className='tc'>Already have an account? </p>
				            <Button onClick={() => this.props.onRouteChange('signin')} waves='light' className='bg-color-secondary'>Sign In</Button>
				     
			        </CardPanel>
			    </Col>
			</Row>


		);
	}

	

}

export default SignUp;