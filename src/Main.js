import React, { Component } from 'react';
import axios from 'axios';
import { Suspense, lazy } from 'react';
import request from 'superagent';
import debounce from 'lodash.debounce'

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
    windowHeight: 0,
    isLoading: false, 
    stopListener : false
  }

  componentWillMount = async () => {
    const { pathname } = this.props.location;
    const query = pathname.split('=')[1] ? pathname.split('=')[1] : 'reactjs';

    this.setState({ query },() => {
      this.fetchData();
      this.addListener();
    });
  }

  stopListener() {
    this.setState({ stopListener: true });
    this.startListener();
  }

  startListener() {
    setTimeout(() => {
      this.setState({ stopListener: false });
      this.startListener();
    }, 1000);
  }

  addListener = () => {
    window.addEventListener('scroll', () => {
      const { stopListener, articles, page, resultsCount } = this.state;
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !stopListener && articles.length && (articles.length < resultsCount - 1)) {
        
        const num = (articles.length < resultsCount - 1) ? this.state.page : page + 1;

        this.setState({ isLoading: true, page: num }, () => {
          this.loadMoreData();
          this.stopListener();
        });
      }
    });
  }


  loadMoreData = async() => {
    try{
      let { limit, page, query, resultsCount } = this.state;
      let errorMessage, articlesArr, arr;
      if(Math.floor(resultsCount/limit)+1 > page+1) {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=5eddff77effb4574956c391597a288db&pageSize=${limit}&page=${page + 1}`);
        // console.log(response ,'response');
        // console.log(this.state.articles, 'state articles')
        const { totalResults, status, articles  } = response.data;
        // console.log(articles, 'articles from response');
        if(status === 'ok' && articles.length) {
          articlesArr = articles.map(itm => ({...itm, isClicked: false }));
          errorMessage = '';
        } else  {
          articlesArr = [];
          errorMessage = 'No results Found!';
        }
        arr = [...this.state.articles].concat(articlesArr);
        this.setState(state => ({
           articles: arr, errorMessage,  resultsCount: totalResults, page: page+1, isLoading: false
        }));
      } else {
        this.setState(() => ({  errorMessage: 'No Results Found', isLoading: false }));
      }
    } catch(err) {
      // console.log(err);
      this.setState(() => ({ errorMessage: 'Showed all the result', isLoading: false }));
    }
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
        } else if(totalResults === 0)  {
          articlesArr = [];
          errorMessage = 'No results Found!';
        }
        

        this.setState(state => ({
           articles: articlesArr , errorMessage,  resultsCount: totalResults
        }));
      } else {
        this.setState({ errorMessage: 'Empty Search Term', articles: []});
      }
    }catch(err) {
      // const articlesArr = [];
      this.setState({ articles: [], errorMessage: 'No Input Fields are entered*', resultsCount: 0 });
    }
  }

  tick() {
    if(this.state.articles.length) {
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
    this.fetchData();
  }

  render() {
    const { articles, query, errorMessage, limit, seconds, isLoading } = this.state;
    const { resetMethod } = this.props;
    return (
      <div className="App">
        <header>Latest News Search</header>
        <Suspense fallback={<div><Static limit={ limit }/></div>}>
          <Home 
            articles={articles}
            change={ this.handleChange }
            enter={ this.handleOnEnter }
            query={ query }
            onclick={ this.handleClick }
            error={ errorMessage }
            resetMethod={ resetMethod }
            seconds={ seconds }
            isLoading={ isLoading }
          />
        </Suspense>
      </div>
    );
  }
}

export default Main;
