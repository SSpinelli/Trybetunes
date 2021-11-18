import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  getName() {
    getUser()
      .then((resolved) => this.setState({ name: resolved.name }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { name, loading } = this.state;
    const load = (
      <div>
        <h2 data-testid="header-user-name">{`Olá ${name}`}</h2>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </div>
    );
    return (
      <header data-testid="header-component">
        <h1>Esse é o header</h1>
        { loading
          ? <Loading />
          : load }
      </header>
    );
  }
}

export default Header;
