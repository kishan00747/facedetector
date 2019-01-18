import React from 'react';

import {Row, Col, Input, Button, CardPanel} from 'react-materialize';
import './SignIn.css'

class SignIn extends React.Component
{ 

	render()
	{
		return(

			<Row className='ma4'>
			    <Col s={12} className='display-center'>
			        <CardPanel className="center color-primary">
			           <form>
			           		<h4>Sign In</h4>
				            <Input className='' s={12} type='email' label='Email' />
				            <Input s={12} type='password' label='Password' />
				            <Button onClick={() => this.props.onRouteChange('home')} large waves='light' className='bg-color-secondary'>Sign In</Button>
				            <br />
				            <p className='tc'>Don't have an account? </p>
				            <Button onClick={() => this.props.onRouteChange('signup')} waves='light' className='bg-color-secondary'>Sign Up</Button>
				       </form>
			        </CardPanel>
			    </Col>
			</Row>


		);
	}

	

}

export default SignIn;