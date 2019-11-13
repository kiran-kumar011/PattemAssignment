import React, { Component } from 'react';

const Input = () => {

	return(
		<div>
			<div className='timer'>
				<p>Auto refresh in { 0 } seconds</p>
			</div>
			<div className='input-wrapper-border'>
				<div  className='input-wrapper'>
					<input 
						// onChange={ change } 
						name='query' 
						type='text'
						// onKeyPress={ enter }
						// value={ query }
					/>
					<i className="fas fa-search"/>
				</div>
			</div>
		</div>
	)
}

export default Input;