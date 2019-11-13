import React, { Component } from 'react';
import Input from './Input';


const Article = () => {
	
	return (
		<div className='article'>
			<div className='static-image-wrapper'>
			</div>
			<div>
				<div className='static-article-title'>
					<p></p>
				</div>
				<div className='static-article-author'>
					<p></p>
				</div>
			</div>
		</div>
	)
}


const Static = (props) => {
	let arr = [];
	for(let i=0; i<props.limit; i++) {
		arr.push(i);
	}

	return(
		<div className='container'>
			<Input />
			<div className='articles-wrapper'>
				{
					arr.length ? 
					arr.map((itm, ind) => (<Article key={ind} />)) : null
				}
			</div>
			
		</div>
	)
}



export default Static;