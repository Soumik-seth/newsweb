import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: "general"
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
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
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResult: parsedData.totalResults, loading: false });
  }

  // previous = () => {
  //   this.setState({ page: this.state.page - 1 }, this.updateNews);
  // };

  // next = () => {
  //   this.setState({ page: this.state.page + 1 }, this.updateNews);
  // };

  fetchMoreData= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({ articles:this.state.articles.concat(parsedData.articles), totalResult: parsedData.totalResults, loading: false });
  }

  render() {
    return (
      <div className="container my-3">
        {this.state.loading &&<Spinner/>}
        <h1 className="text-center " style={{marginTop:'90px'}}>NewsMonkey - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner/>}
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
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.previous}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} className="btn btn-dark" onClick={this.next}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
