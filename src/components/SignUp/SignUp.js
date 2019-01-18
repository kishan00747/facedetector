import React from 'react';

import {Row, Col, Input, Button, CardPanel} from 'react-materialize';
import './SignUp.css'

class SignUp extends React.Component
{ 

	render()
	{
		return(

			<Row className='ma4'>
			    <Col s={12} className='display-center'>
			        <CardPanel className="center color-primary">
			           <form>
			           		<h4>Sign Up</h4>
				            <Input className='' s={6} type='text' label='First Name' />
				            <Input className='' s={6} type='text' label='Last Name' />
				            <Input className='' s={12} type='email' label='Email' />
				            <Input s={12} type='password' label='Password' />
				            <Button onClick={() => this.props.onRouteChange('home')} large waves='light' className='bg-color-secondary'>Sign Up</Button>
				            <br />
				            <p className='tc'>Already have an account? </p>
				            <Button onClick={() => this.props.onRouteChange('signin')} waves='light' className='bg-color-secondary'>Sign In</Button>
				       </form>
			        </CardPanel>
			    </Col>
			</Row>


		);
	}

	

}

export default SignUp;