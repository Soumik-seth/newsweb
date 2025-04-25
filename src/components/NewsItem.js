import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imgurl, newsurl, author, date } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgurl} className="card-img-top" style={{ height: '170px', objectFit: 'cover' }} alt="News" />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 40) : "No Title"}</h5>
            <p className="card-text">{description ? description.slice(0, 88) : "No Description"}</p>
            <p className="card-text"><small className="text-muted">{author || "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
