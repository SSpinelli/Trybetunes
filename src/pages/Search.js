import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      phrase: '',
      artist: '',
      buttonStatus: true,
      albuns: [],
      loadingAlbuns: false,
      errorMessage: 'Nenhum álbum foi encontrado',
      errorStatus: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.printAlbum = this.printAlbum.bind(this);
  }

  handleChange(type) {
    const typedArtist = type.target.value;
    const minLength = 2;

    this.setState({ artist: typedArtist });

    return (typedArtist.length >= minLength)
      ? this.setState({ buttonStatus: false })
      : this.setState({ buttonStatus: true });
  }

  handleClick(click) {
    click.preventDefault();
    const { artist } = this.state;
    this.setState({ loadingAlbuns: true });

    searchAlbumsAPI(artist)
      .then((response) => {
        if (response.length > 0) {
          this.printAlbum(response);
          return this.setState({ errorStatus: false });
        } return this.setState({ errorStatus: true });
      })
      .then(() => this.setState({ loadingAlbuns: false }));
    this.setState({
      // Fernando Mós me ajudou a resolver o problema do requisito 2;
      phrase: artist,
      artist: '',
    });
  }

  printAlbum(arrayOfObject) {
    const albunsList = arrayOfObject.map((album) => (
      <Link
        key={ album.collectionId }
        data-testid={ `link-to-album-${album.collectionId}` }
        to={ `/album/${album.collectionId}` }
      >
        <li>{ album.collectionName }</li>
      </Link>));

    this.setState({ albuns: albunsList });
  }

  render() {
    const { buttonStatus, albuns, loadingAlbuns,
      artist, phrase, errorMessage, errorStatus } = this.state;
    const load = (
      <div>
        <h3>{`Resultado de álbuns de: ${phrase}`}</h3>
        { errorStatus ? <h3>{ errorMessage }</h3> : <ul>{ albuns }</ul> }
      </div>
    );
    return (
      <div data-testid="page-search">
        <form className="hidden">
          <label htmlFor="artist-name">
            <input
              value={ artist }
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
            onClick={ this.handleClick }
          >
            Procurar
          </button>
        </form>
        { loadingAlbuns ? <Loading /> : load }
      </div>
    );
  }
}

export default Search;
