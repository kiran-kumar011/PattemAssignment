import React from 'react';


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

const Input = () => {

	return(
		<div>
			<div className='timer'>
				<p>Auto refresh in { 0 } seconds</p>
			</div>
			<div className='input-wrapper-border'>
				<div  className='input-wrapper'>
					<input 
						name='query' 
						type='text'
					/>
					<i className="fas fa-search"/>
				</div>
			</div>
		</div>
	)
}



const Static = (props) => {
	let arr = Array.from({ length: props.limit });

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