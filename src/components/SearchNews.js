import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class SearchNews extends Component {
  state = {
    articles: [],
    loading: false
  };

  async componentDidMount() {
    const query = this.props.params.query;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=f6867a088db2469293980223e8c72944`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsed = await data.json();
    this.setState({ articles: parsed.articles, loading: false });
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Search Results for "{this.props.params.query}"</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={article.title}
                description={article.description}
                imgurl={article.urlToImage}
                newsurl={article.url}
                author={article.author}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withParams(SearchNews);
