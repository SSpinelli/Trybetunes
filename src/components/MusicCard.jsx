import React from 'react';
import PropTypes from 'prop-types';
import './Style/MusicCard.css';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isFavorite: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { musicObj } = this.props;
    getFavoriteSongs()
      .then((response) => this.setState({
        isFavorite: response.some((music) => music.trackId === musicObj.trackId),
        loading: false,
      }));
  }

  handleChange({ target }) {
    const { musicObj, fav } = this.props;
    this.setState({ loading: true });

    if (fav) {
      fav(musicObj);
    }

    return target.checked ? (
      addSong(musicObj)
        .then(() => this.setState({ loading: false, isFavorite: true }))
    ) : removeSong(musicObj)
      .then(() => this.setState({ loading: false, isFavorite: false }));
  }

  render() {
    const { musicObj } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <div className="music-card-div">
        { loading ? <Loading /> : (
          <>
            <div className="music-card-div-musicName-and-favorite">
              <h4>{ musicObj.trackName }</h4>
              <label htmlFor="favorite">
                Favorita
                <input
                  id="favorite"
                  checked={ isFavorite }
                  onChange={ this.handleChange }
                  type="checkbox"
                  data-testid={ `checkbox-music-${musicObj.trackId}` }
                />
              </label>
            </div>
            <audio data-testid="audio-component" src={ musicObj.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  fav: PropTypes.func.isRequired,
};

export default MusicCard;
