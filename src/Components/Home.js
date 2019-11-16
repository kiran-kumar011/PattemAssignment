import React from 'react';
import Article from './Article';
import Static from './Static';
import Loader from './Loader';

const Home = (props) => {

	const { articles, seconds, change, query, enter, onclick, error, isLoading } = props;
	return(
		<div className='container'>
			<div className='timer'>
				<p>Auto refresh in { seconds } seconds</p>
			</div>
			<div className='input-wrapper-border'>
				<div  className='input-wrapper'>
					<input 
						onChange={ change } 
						name='query' 
						type='text'
						onKeyPress={ enter }
						value={ query }
					/>
					<i onClick={ onclick } className="fas fa-search"/>
				</div>
			</div>
			<div className='articles-wrapper'>
				{
					articles.length ?
					articles.map((itm, ind) => (<Article key={ind} article={itm} />))
					: 
					null
				}
				{
					isLoading ? <Loader /> : null
				}
			</div>
			<div>
				<h1>{error}</h1>
			</div>
		</div>
	)
}


export default Home;

