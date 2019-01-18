import React from 'react';
import './FaceRecognition.css'
import BoundingBox from './BoundingBox';

class FaceRecognition extends React.Component
{ 

	render()
	{
		const {imageURL, boxArray } = this.props;

			const boundingBoxSet = boxArray.map((data, i) => {
				return <BoundingBox key={i} box={data} />
			});

			return (

				<div className='display-center mv3'>
					<div className='absolute'>
						<img id='inputImage' alt='' src={imageURL} />
						{boundingBoxSet}
					</div>
				</div>

			);


	}

	

}

export default FaceRecognition;