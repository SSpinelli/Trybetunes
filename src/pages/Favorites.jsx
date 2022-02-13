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
    this.favs = this.favs.bind(this);
  }

  componentDidMount() {
    this.renderFavorites();
  }

  async favs(music) {
    const favs = await getFavoriteSongs();
    const newFavs = favs.filter((el) => el.trackId !== music.trackId);
    this.setState({ favoriteSongs: newFavs });
  }

  renderFavorites() {
    getFavoriteSongs()
      .then((response) => this.setState({
        favoriteSongs: response,
        loading: false,
      }))
      .catch((error) => global.alert(error));
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
                <MusicCard fav={ this.favs } musicObj={ song } />
              </div>
            ))
          )}
        </section>
      </div>
    );
  }
}

export default Favorites;
