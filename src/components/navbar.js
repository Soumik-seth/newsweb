import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withNavigation from './withNavigation';

class Navbar extends Component {
  state = {
    searchText: ''
  };

  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = this.state.searchText.trim();
    if (query) {
      this.props.navigate(`/search/${query}`);
    }
  };

  render() {
    return (
      <nav className="navbar  fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Your News</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.searchText} onChange={this.handleInputChange} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default withNavigation(Navbar);
