import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <article>
        <form>
          <label htmlFor="value-input">
            Valor
            <input type="number" data-testid="value-input" id="value-input" />
          </label>
          <label htmlFor="currencies-select">
            Moeda
            <select id="currencies-select">
              { currencies.map((curr) => (
                <option
                  key={ curr }
                  value={ curr }
                >
                  { curr }
                </option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select id="method-input" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição
            <input type="text" id="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select data-testid="tag-input" id="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpForm.propTypes = {
  currencies: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(ExpForm);
