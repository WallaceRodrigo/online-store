import React, { Component } from 'react';

class Cart extends Component {
  state = {
    isEmpty: false,
    results: [],
  };

  componentDidMount() {
    const getProducts = localStorage.getItem('products');
    const productArray = getProducts ? JSON.parse(getProducts) : this.setState({
      isEmpty: true,
    });
    this.setState({ results: productArray });
  }

  render() {
    const { results, isEmpty } = this.state;
    return (
      <div>
        {
          isEmpty
            ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
            : (
              results.map((product) => (
                <div key={ product.id }>
                  <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ `R$ ${product.price}` }</p>
                </div>
              ))
            )
        }
        <h3
          data-testid="shopping-cart-product-quantity"
        >
          { `Você tem ${results ? results.length : '0'} itens no seu carrinho` }
        </h3>
      </div>
    );
  }
}

export default Cart;
