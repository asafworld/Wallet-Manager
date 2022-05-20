import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
// import fetchAsk from '../actions/expensesAction';
// import updateAction from '../actions/updateAction';
import editAction from '../actions/updateEditAction';

class EditExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
      id: '',
      exchangeRates: {},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { editedExp } = this.props;
    this.setState({
      value: editedExp.value,
      currency: editedExp.currency,
      method: editedExp.method,
      description: editedExp.description,
      tag: editedExp.tag,
      id: editedExp.id,
      exchangeRates: editedExp.exchangeRates,
    });
  }

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onClick = () => {
    const { update, inEditFunc } = this.props;
    const { id, exchangeRates } = this.state;
    console.log(exchangeRates);
    update(this.state, id);
    inEditFunc();
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
              data-testid="currency-input"
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
            data-testid="edit-btn"
            onClick={ () => this.onClick() }
          >
            Editar despesa
          </button>
        </form>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  // expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  update: (state) => dispatch(editAction(state)),
});

EditExpense.propTypes = {
  currencies: propTypes.arrayOf.isRequired,
  update: propTypes.func.isRequired,
  editedExp: propTypes.objectOf.isRequired,
  // expenses: propTypes.arrayOf.isRequired,
  inEditFunc: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
