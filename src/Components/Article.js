import React, { Component } from 'react';

const Article = (props) => {
	// console.log(props.article, 'props from article component');
	const {urlToImage, author, title, description } = props.article;

	return(
		<div className='article'>
			<div className={urlToImage ? 'image-wrapper' : 'image-wrapper empty-image'} >
				<img  
					className={urlToImage ? 'icon-image' : 'empty-image'} 
					src={urlToImage ? urlToImage : ''} 
					alt="image"
				/>
			</div>
			<div>
				<div className='article-title'>
					<p>{title}</p>
				</div>
				<div>
					<p>{author}</p>
				</div>
			</div>
		</div>
	)
}

export default Article;