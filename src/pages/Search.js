import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonStatus: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type) {
    const typedArtist = type.target.value;
    const minLength = 2;

    return (typedArtist.length >= minLength)
      ? this.setState({ buttonStatus: false })
      : this.setState({ buttonStatus: true });
  }

  render() {
    const { buttonStatus } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Esse é o Search</h1>
        <form>
          <label htmlFor="artist-name">
            <input
              onChange={ this.handleChange }
              type="text"
              id="artist-name"
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonStatus }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
