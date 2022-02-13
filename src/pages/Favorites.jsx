import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Style/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.renderFavorites();
  }

  renderFavorites() {
    getFavoriteSongs()
      .then((response) => this.setState({
        favoriteSongs: response,
        loading: false,
      }));
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="favorites-section">
          { loading ? <Loading /> : (
            favoriteSongs.map((song, index) => (
              <div
                className="favorites-div"
                key={ `${song.trackId} ${index}` }
              >
                <img src={ song.artworkUrl100 } alt={ song.trackName } />
                <MusicCard fav={ favoriteSongs } musicObj={ song } />
              </div>
            ))
          )}
        </section>
      </div>
    );
  }
}

export default Favorites;
