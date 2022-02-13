import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({ user: response, loading: false }));
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section>
          {loading ? <Loading /> : (
            <div>
              <div>
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ `foto de ${user.name}` }
                />
                <Link to="/profile/edit">
                  <button type="button">Editar perfil</button>
                </Link>
              </div>
              <h1>Nome:</h1>
              <h2>{ user.name }</h2>
              <h1>Email:</h1>
              <h2>{ user.email }</h2>
              <h1>Descrição:</h1>
              <p>{ user.description }</p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Profile;
