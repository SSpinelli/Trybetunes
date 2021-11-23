import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
    this.favoriteSong = this.favoriteSong.bind(this);
  }

  favoriteSong() {
    const { song } = this.props;
    const { check } = this.state;
    if (!check) {
      this.setState({ loading: true, check: true });
      addSong(song)
        .then(() => this.setState({ loading: false }));
    } else {
      this.setState({ check: false });
    }
  }

  render() {
    const { song } = this.props;
    const { loading, check } = this.state;
    const ifFalse = (
      <>
        <h1 key={ song.trackName }>{ song.trackName }</h1>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ song.trackId }>
          Favorita:
          <input
            onChange={ this.favoriteSong }
            type="checkbox"
            checked={ check }
            id={ song.trackId }
            data-testid={ `checkbox-music-${song.trackId}` }
          />
        </label>
      </>
    );
    return (
      <div>
        { loading ? <Loading /> : ifFalse }
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape().isRequired,
};

export default MusicCard;
