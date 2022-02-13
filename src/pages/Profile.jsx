import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Style/Profile.css';

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
        <section className="profile-section">
          {loading ? <Loading /> : (
            <div className="profile-div">
              <div>
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ `foto de ${user.name}` }
                />
                <Link to="/profile/edit">
                  <button
                    className="edit-profile-btn"
                    type="button"
                  >
                    Editar perfil
                  </button>
                </Link>
              </div>
              <h3>Nome:</h3>
              <p>{ user.name }</p>
              <h3>Email:</h3>
              <p>{ user.email }</p>
              <h3>Descrição:</h3>
              <p>{ user.description }</p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Profile;
