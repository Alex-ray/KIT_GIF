import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import classNames from 'classnames';

// Styles
import {
  card,
  flexImage,
  infoList,
  favoriteItem
} from './gif-card.css';

class GifCard extends Component {
  static propTypes = {
    loop: PropTypes.bool,
    showInfo: PropTypes.bool,
    gifUrl: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    source: PropTypes.string,
    rating: PropTypes.string,
    favorite: PropTypes.bool,
    toggleFavorite:  PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  handleMouseLeave = () =>{
    this.setState({hovering: false });
  }

  handleMouseEnter = () => {
    this.setState({hovering: true });
  }

  getInfo (source, rating, date, favorite, toggleFavorite) {
    return (
      <div>
      <ul className={infoList}>
        <li>Source: <a target='blank' href={source}>{source}</a></li>
        <li>Rating: {rating}</li>
        <li>{moment(new Date(date)).fromNow()}</li>
      </ul>
        <i className={classNames(favoriteItem, 'material-icons')} onClick={toggleFavorite}>{favorite ? 'favorite' : 'favorite_border'}</i>
      </div>
    );
  }

  render () {
    const {
      props: {
        showInfo,
        gifUrl,
        previewUrl,
        loop,
        source,
        rating,
        date,
        favorite,
        toggleFavorite
      },
      state: {
        hovering
      }
    } = this;

    let url = (hovering && !loop) ? gifUrl : previewUrl;

    return (
      <div className={card} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <img className={flexImage} src={url} />
        {showInfo && this.getInfo(source, rating, date, favorite, toggleFavorite)}
      </div>
    );
  }
}

GifCard.defaultProps = {
  showInfo: false,
  loop: false,
  source: '',
  rating: '',
  favorite: false
};

export default GifCard;
