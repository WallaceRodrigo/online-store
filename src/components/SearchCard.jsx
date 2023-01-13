import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchCard extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;

    return (
      <Link to={ `/Product/${id}` } data-testid="product-detail-link">
        <li data-testid="product">
          <h2>{ title }</h2>
          <img src={ thumbnail } alt={ title } />
          <h3>{ price }</h3>
        </li>
      </Link>

    );
  }
}

SearchCard.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SearchCard;
