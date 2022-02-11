import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Tela de Favorites
      </div>
    );
  }
}

export default Favorites;
