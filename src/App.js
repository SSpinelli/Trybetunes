import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './MyRoutes';

// Encontrei essa forma de organizar o código com Júlia Barcelos :)

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
