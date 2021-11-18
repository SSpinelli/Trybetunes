import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonStatus: true,
      loading: false,
      loaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type) {
    const typedText = type.target.value;
    const minLength = 3;

    this.setState({ name: typedText });

    return (typedText.length >= minLength)
      ? this.setState({ buttonStatus: false })
      : this.setState({ buttonStatus: true });
  }

  handleClick(click) {
    click.preventDefault();
    this.setState({ loading: true });
    const { name } = this.state;
    createUser({ name }).then(() => this.setState({ loaded: true, loading: false }));
  }

  render() {
    const { buttonStatus, loaded, loading } = this.state;
    // Mais uma vez minha amiga Júlia me ajudou a organizar o meu código!
    const load = (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            <input
              type="text"
              name="name-input"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ buttonStatus }
          >
            Entrar
          </button>
        </form>
      </div>
    );
    return (
      <>
        { loading ? <Loading /> : load }
        { loaded && <Redirect to="/search" /> }
      </>
    );
  }
}

export default Login;
