import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 6
  };

  static propTypes = {
    pageSize: propTypes.number,
  };

  state = {
    articles: [],
    loading: true,
    page: 1,
    totalResult: 0,
  };

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/everything?q=apple&from=2025-04-24&to=2025-04-24&sortBy=popularity&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResults,
      loading: false
    });
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/everything?q=apple&from=2025-04-24&to=2025-04-24&sortBy=popularity&apiKey=${this.props.apikey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResult: parsedData.totalResults,
      page: nextPage
    });
  };

  render() {
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner />}
        <h1 className="text-center" style={{ marginTop: '90px' }}>
          Your News - Popular News on "Apple"
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  author={element.author}
                  date={element.publishedAt}
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
