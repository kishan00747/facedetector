import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {

	const {updateImage, detectImage} = props;

	return (

		
			<div className='tc'>
				<p className='white-text flow-text'>This Magic Brain will detect faces in your pictures. Give it a try.</p>
				<Row className='display-center br'>
					<Col id='link-box' className='shadow-3'>
						<div style={{width:'80%'}} >
							<Input s={12} type='text' label='Enter your Link here' onChange={updateImage}/>
						</div>
						<Button style={{width:'20%', minWidth:'100px', marginTop:'20px'}} className='bg-color-secondary' waves='light' onClick={detectImage}>DETECT</Button>
					</Col>
				</Row>
			</div>
		
		
	);



}

export default ImageLinkForm;