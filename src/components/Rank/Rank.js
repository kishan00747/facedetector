import React from 'react';

const Rank = (props) =>
{
	const {user, rank} = props;

	return (

		<div>
			<p className='center white-text flow-text'>Hello {user}!</p>
			<p className='center white-text flow-text'>Your entry count is {rank}</p>
		</div>


	);
}

export default Rank;