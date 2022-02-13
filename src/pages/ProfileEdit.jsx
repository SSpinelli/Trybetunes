import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: true,
      isDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({
        name: response.name,
        email: response.email,
        image: response.image,
        description: response.description,
        loading: false,
      }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  handleClick() {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ redirect: true, loading: false });
  }

  enableButton() {
    const { name, email, image, description } = this.state;

    if (name.length && email.length
      && image.length && description.length
      && email.includes('@') && email.includes('.com')) {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { name, email, image, description, loading, isDisabled, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="edit-input-name">
              Editar nome:
              <input
                name="name"
                value={ name }
                data-testid="edit-input-name"
                id="edit-input-name"
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="edit-input-email">
              Editar E-mail:
              <input
                name="email"
                value={ email }
                data-testid="edit-input-email"
                id="edit-input-email"
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="edit-input-image">
              Editar Foto:
              <input
                name="image"
                value={ image }
                data-testid="edit-input-image"
                id="edit-input-image"
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="edit-input-description">
              Editar Descrição:
              <input
                name="description"
                value={ description }
                data-testid="edit-input-description"
                id="edit-input-description"
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
            {redirect && <Redirect to="/profile" />}
          </form>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
