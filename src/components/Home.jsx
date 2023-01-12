import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductById } from '../services/api';
import SearchCard from './SearchCard';

class Home extends Component {
  state = {
    apiReturn: [],
    inputSearch: '',
    result: [],
    isEmpty: true,
  };

  async componentDidMount() {
    const apiReturn = await getCategories();
    this.setState({ apiReturn });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const values = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: values });
  };

  handleSearchButton = async () => {
    const { inputSearch } = this.state;
    const result = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({ result, isEmpty: false });
  };

  handleRadioButton = async (id) => {
    const result = await getProductById(id);
    this.setState({ result, isEmpty: false });
  };

  renderCard = (results) => {
    if (results <= 0) {
      return <h2>Nenhum produto foi encontrado</h2>;
    }
    return results.map(({ price, title, thumbnail, id }) => (
      <SearchCard
        key={ id }
        price={ price }
        title={ title }
        thumbnail={ thumbnail }
      />
    ));
  };

  render() {
    const { apiReturn, result: { results }, isEmpty } = this.state;

    return (
      <div>
        <Link data-testid="shopping-cart-button" to="cart">Carrinho</Link>
        {
          isEmpty
            ? (
              <h2 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h2>
            )
            : this.renderCard(results)
        }

        <div>
          <label htmlFor="search">
            Pesquisa
            <input
              data-testid="query-input"
              type="text"
              id="search"
              name="inputSearch"
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="button"
            value="Pesquisar"
            data-testid="query-button"
            onClick={ () => this.handleSearchButton() }
          />
        </div>

        <div className="categories">
          {
            apiReturn.map((category) => (
              <label data-testid="category" key={ category.id } htmlFor="categories">
                { category.name }
                <input
                  type="radio"
                  name="categories"
                  value={ category.id }
                  onChange={ () => this.handleRadioButton(category.id) }
                />
              </label>
            ))
          }
        </div>
      </div>
    );
  }
}

// oi

export default Home;
