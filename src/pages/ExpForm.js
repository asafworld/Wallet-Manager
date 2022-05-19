import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchAsk from '../actions/expensesAction';

class ExpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
    };

    this.onClick = this.onClick.bind(this);
  }

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onClick = (state) => {
    const { dispatch } = this.props;
    dispatch(state);
    this.setState({ value: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, description, tag } = this.state;
    return (
      <article>
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              type="number"
              name="value"
              data-testid="value-input"
              id="value-input"
              value={ value }
              onChange={ (event) => this.onChange(event) }
            />
          </label>
          <label htmlFor="currencies-select">
            Moeda
            <select
              id="currencies-select"
              value={ currency }
              name="currency"
              onChange={ (event) => this.onChange(event) }
            >
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
            Método de pagamento
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ (event) => this.onChange(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              id="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ (event) => this.onChange(event) }
            />
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ (event) => this.onChange(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.onClick(this.state) }
          >
            Adicionar despesa
          </button>
        </form>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (state) => dispatch(fetchAsk(state)),
});

ExpForm.propTypes = {
  currencies: propTypes.arrayOf.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpForm);
