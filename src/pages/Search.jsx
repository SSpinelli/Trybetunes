import React from 'react';
import Header from '../components/Header';
import './Style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedText: '',
      isDisabled: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick({ target }) {
    console.log(target);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });

    return value.length >= 2
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true });
  }

  render() {
    const { searchedText, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form">
          <input
            className="search-input"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            name="searchedText"
            type="text"
            value={ searchedText }
          />
          <button
            className="search-button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>

    );
  }
}

export default Search;
