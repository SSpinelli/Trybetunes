import React from 'react';
import PropTypes from 'prop-types';
import './Style/MusicCard.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { musicObj } = this.props;

    return target.checked ? addSong(musicObj) : removeSong(musicObj);
  }

  render() {
    const { musicObj } = this.props;
    return (
      <div className="music-card-div">
        <div className="music-card-div-musicName-and-favorite">
          <h4>{ musicObj.trackName }</h4>
          <input
            onClick={ this.handleClick }
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
