import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      product: await getProductById(id),
    });
  }

  handleAddProductToCart = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { product: { title, thumbnail, pictures, price, warranty } } = this.state;
    return (
      <div data-testid="product">
        <span data-testid="product-detail-name">{ title }</span>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <ol>
          {pictures?.map((picture) => (
            <li key={ picture.id }>
              <img src={ picture.secure_url } alt={ title } />
            </li>
          ))}
        </ol>
        <small data-testid="product-detail-price">{ price }</small>
        <small>{warranty}</small>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => this.handleAddProductToCart() }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default ProductDetails;
