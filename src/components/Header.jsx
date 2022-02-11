import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {!loaded ? <Loading /> : (
          <h3 data-testid="header-user-name">{ name }</h3>
        )}
      </header>
    );
  }
}

export default Header;
