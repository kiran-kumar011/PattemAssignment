import React, { Component } from 'react';
import axios from 'axios';
import { Suspense, lazy } from 'react';

// importing components.
import Static from './Components/Static';
const Home = React.lazy(() => import('./Components/Home'));


class Main extends Component {
  state = {
    limit: 10,
    page: 1,
    query: '',
    articles: [],
    errorMessage: '',
    seconds: 0,
    resultsCount: 0,
  }

  componentWillMount = async () => {
    const { pathname } = this.props.location;

    const query = pathname.split('=')[1] ? pathname.split('=')[1] : 'reactjs';

    this.setState({ query },() => {
      this.fetchData();
    });
  }


  fetchData = async() => {
    try {
      const { limit, page, query } = this.state;
      let errorMessage, articlesArr;
      const string = query.trim().toLowerCase();
      if(string) {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=${limit}&page=${page}`);

        const { totalResults, status, articles  } = response.data;
        if(status === 'ok' && totalResults !== 0) {
          articlesArr = articles.map(itm => ({...itm, isClicked: false }));
          errorMessage = '';
        } else  {
          articlesArr = [];
          errorMessage = 'No results Found!';
        }
        
        this.setState({ articles: articlesArr , errorMessage,  resultsCount: totalResults, query: '' });
      } else {
        this.setState({ errorMessage: 'Empty Search Term', articles: []});
      }
    }catch(err) {
      const articlesArr = [];
      this.setState({ articles: articlesArr, errorMessage: 'No Input Fields are typed*', resultsCount: 0 });
    }
  }

  tick() {
    if(this.state.seconds === 30) {
      this.setState(prevState => ({
        seconds: 0 + 1
      }));
      this.fetchData();
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }
    
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }


  handleOnEnter = async (e) => {
    if(e.key === 'Enter') {
      await this.fetchData();
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleClick = async e => {
    await this.fetchData();
  }

  render() {
    const { articles, query, errorMessage, limit, seconds } = this.state;
    const { resetMethod } = this.props;
    return (
      <div className="App">
        <header>Latest News Search</header>
        <Suspense fallback={<Static limit={ limit }/>}>
          <Home 
            articles={articles}
            change={ this.handleChange }
            enter={ this.handleOnEnter }
            query={ query }
            onclick={ this.handleClick }
            error={ errorMessage }
            resetMethod={ resetMethod }
            seconds={ seconds }
          />
        </Suspense>
      </div>
    );
  }
}

export default Main;
