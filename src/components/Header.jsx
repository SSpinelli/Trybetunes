import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Style/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loaded: false,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({
        user: response,
        loaded: true,
      }));
  }

  render() {
    const { user: { name }, loaded } = this.state;
    return (
      <header className="header-header" data-testid="header-component">
        {!loaded ? <Loading /> : (
          <div className="header-div">
            <h3 className="header-h3" data-testid="header-user-name">{ name }</h3>
            <h1 className="header-h1">TrybeTunes</h1>
            <nav>
              <ul className="header-nav-ul">
                <Link to="/search">
                  <li data-testid="link-to-search">Search</li>
                </Link>
                <Link to="/favorites">
                  <li data-testid="link-to-favorites">Favorites</li>
                </Link>
                <Link to="/profile">
                  <li data-testid="link-to-profile">Profile</li>
                </Link>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
