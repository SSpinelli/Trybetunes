import React from 'react';
import PropTypes from 'prop-types';
import './Style/MusicCard.css';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isFavorite: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { musicObj } = this.props;
    getFavoriteSongs()
      .then((response) => this.setState({
        isFavorite: response.some((music) => music.trackId === musicObj.trackId),
        loading: false,
      }));
  }

  handleClick({ target }) {
    const { musicObj } = this.props;

    this.setState({ loading: true });

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
              <input
                checked={ isFavorite }
                onChange={ this.handleClick }
                type="checkbox"
                data-testid={ `checkbox-music-${musicObj.trackId}` }
              />
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
    trackId: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
