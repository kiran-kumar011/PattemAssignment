import React from 'react';

const Article = (props) => {
	const {urlToImage, author, title } = props.article;

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