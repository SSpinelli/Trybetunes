import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Tela de Profile
      </div>
    );
  }
}

export default Profile;
