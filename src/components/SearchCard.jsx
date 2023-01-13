import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchCard extends Component {
  addCartButton = (array) => {
    const getProducts = localStorage.getItem('products');
    const productArray = getProducts ? JSON.parse(getProducts) : [];
    productArray.push(array);
    localStorage.setItem('products', JSON.stringify(productArray));
  };

  render() {
    const { title, thumbnail, price, id, array } = this.props;

    return (
      <div>
        <Link to={ `/Product/${id}` } data-testid="product-detail-link">
          <li data-testid="product">
            <h2>{ title }</h2>
            <img src={ thumbnail } alt={ title } />
            <h3>{ price }</h3>
          </li>
        </Link>
        <input
          data-testid="product-add-to-cart"
          type="button"
          value="adiciona ao carinho"
          onClick={ () => this.addCartButton(array) }
        />
      </div>

    );
  }
}

SearchCard.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  array: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchCard;
