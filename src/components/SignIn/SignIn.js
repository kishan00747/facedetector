import React from 'react';

import {Row, Col, Input, Button, CardPanel} from 'react-materialize';
import './SignIn.css'

class SignIn extends React.Component
{ 

	constructor(props) 
	{
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			showError: false,
			message: '',
		}
	}

	onEmailChange = (event) => 
	{
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => 
	{
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () =>
	{
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		 .then(response => response.json())
		 .then(data => {
		 	if(data.result === 'success')
		 	{
		 		this.props.loadUser(data.user);
		 		this.props.onRouteChange('home');
		 	}
		 	else
		 	{
		 		this.setState({showError: true, message: 'Error Signing In!'})
		 	}
		 });
	}

	render()
	{
		return(

			<Row className='ma4'>
			    <Col s={12} className='display-center'>
			        <CardPanel className="center color-primary">
			           
			           		<h4>Sign In</h4>
			           		{ this.state.showError ? <p className="error-message">{this.state.message}</p> : null }
			           		{ this.props.showSignUpSuccess ? <p className="success-message">Sign Up Successful!</p> : null }
				            <Input onChange={this.onEmailChange} className='' s={12} type='email' label='Email' />
				            <Input onChange={this.onPasswordChange} s={12} type='password' label='Password' />
				            <Button onClick={this.onSubmitSignIn} large waves='light' className='bg-color-secondary'>Sign In</Button>
				            <br />
				            <p className='tc'>Don't have an account? </p>
				            <Button onClick={() => this.props.onRouteChange('signup')} waves='light' className='bg-color-secondary'>Sign Up</Button>
				      
			        </CardPanel>
			    </Col>
			</Row>


		);
	}

	

}

export default SignIn;