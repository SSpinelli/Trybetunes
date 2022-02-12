import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searchedText: '',
      isDisabled: true,
      discography: [],
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(click) {
    click.preventDefault();
    const { searchedText } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(searchedText)
      .then((albuns) => this.setState({ discography: albuns }))
      .then(() => this.setState({ loading: false, searchedText: '' }));

    this.setState({ artist: searchedText });
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });

    return value.length >= 2
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true });
  }

  render() {
    const { searchedText, isDisabled, loading, discography, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form className="search-form">
            <input
              className="search-input"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              name="searchedText"
              placeholder="Artista ou Banda..."
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
        )}
        <div className="search-div-h1">
          <h1>{`Resultado de álbuns de: ${artist}`}</h1>
        </div>
        { !discography.length ? (
          <h1
            className="search-noResults"
          >
            Nenhum álbum foi encontrado
          </h1>
        ) : (
          <section className="search-section">
            { discography && (
              discography.map((album) => (
                <Link to={ `/album/${album.collectionId}` } key={ album.collectionId }>
                  <div
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="search-div-albuns"
                  >
                    <h1>{ album.collectionName }</h1>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </div>
                </Link>
              ))
            )}
          </section>
        ) }
      </div>

    );
  }
}

export default Search;
