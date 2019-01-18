import React from 'react';
import {NavItem, Navbar} from 'react-materialize';
import './Navigation.css';

const Navigation = ({onRouteChange, routeStatus}) => {

	return (

		<Navbar className='ph2 nav-color' brand='Face Detector' right>
		
			{
				routeStatus === 'home' 
				? <NavItem onClick={() => onRouteChange('signin')} href='#'>Sign Out</NavItem>
				: (
				  	<div>
				  		<NavItem onClick={() => onRouteChange('signin')} href='#'>Sign In</NavItem>
				  		<NavItem onClick={() => onRouteChange('signup')} href='#'>Sign Up</NavItem>
				  	</div>
				)			

							 


			}  
		
		</Navbar>
	);



}

export default Navigation;