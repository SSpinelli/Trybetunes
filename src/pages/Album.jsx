import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import './Style/Album.css';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    const href = document.URL.split('/')[4];

    getMusics(href)
      .then((album) => this.setState({ musics: album }))
      .catch((error) => global.alert(error));
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { !musics.length ? <Loading /> : (
          <section className="album-section">
            <div className="album-info-div">
              <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
              <h1 data-testid="album-name">{ musics[0].collectionName }</h1>
              <h3 data-testid="artist-name">{ musics[0].artistName }</h3>
            </div>
            <div className="album-track-div">
              {musics
                .filter((_music, index) => index > 0)
                .map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    musicObj={ music }
                  />
                )) }
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Album;
