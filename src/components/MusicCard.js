import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    return (
      <>
        <h1 key={ song.trackName }>{ song.trackName }</h1>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape().isRequired,
};

export default MusicCard;
