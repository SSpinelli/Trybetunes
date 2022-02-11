import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disableBtn: true,
      loaded: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const MIN_LETTERS = 3;

    this.setState({ [name]: value });

    return value.length >= MIN_LETTERS
      ? this.setState({ disableBtn: false })
      : this.setState({ disableBtn: true });
  }

  handleClick() {
    const { name } = this.state;

    this.setState({ loading: true });
    createUser({
      name,
      email: '',
      image: '',
      description: '',
    }).then(() => this.setState({ loaded: true, loading: false }));
  }

  render() {
    const { loaded, loading, name, disableBtn } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="login-name-input"
                name="name"
                onChange={ this.handleChange }
                type="text"
                value={ name }
              />
              <button
                data-testid="login-submit-button"
                disabled={ disableBtn }
                onClick={ this.handleClick }
                type="button"
              >
                Entrar
              </button>
            </form>
          )}
        { loaded && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
