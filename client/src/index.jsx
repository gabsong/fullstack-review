import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount () {
    this.getRepos();
  }

  getRepos () {
    axios.get('/repos')
    .then((response) => {
      this.setState({ repos: response.data });
    })
    .catch((error) => {
      console.log('Error log from axios.get:', error);
    })
    .finally(() => {
      console.log('Invoked Promise.prototype.finally()');
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      data: term
    })
    .then((response) => {
      this.getRepos();
    })
    .catch((error) => {
      console.log('Error log from axios.post:', error);
    })
    .finally(() => {
      console.log('Invoked Promise.prototype.finally()');
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));