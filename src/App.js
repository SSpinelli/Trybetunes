import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

// Encontrei essa forma de organizar o código com Júlia Barcelos :)

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
