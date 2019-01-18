import React from 'react';
import './BoundingBox.css';

const BoundingBox = (props) =>
{
	const {box} = props;
	return (
	
			<div style={{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}} className='bounding-box'>
			</div>
	);
}

export default BoundingBox;