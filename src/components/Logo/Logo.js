import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {

	return (

		<div className='pa3 ma3'>
			<Tilt className="Tilt br2 shadow-2 mh-auto" options={{ max : 35}} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner tc" style={{paddingTop: '25px'}}><img alt='Brain' style={{margin:'auto', height: 100, width: 100 }} src={brain} /> </div>
			</Tilt>
		</div>
	);



}

export default Logo;