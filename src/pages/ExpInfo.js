import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import updateAction from '../actions/updateAction';

class ExpInfo extends React.Component {
  deleteOnClick = (description) => {
    const { expenses, deleteDispatch } = this.props;
    const newExp = expenses.filter((exp) => exp.description !== description);
    deleteDispatch(newExp);
  }

  editOnClick = (exp) => {
    const { expForEdit } = this.props;
    expForEdit(exp);
  }

  render() {
    const { expenses } = this.props;
    const dolarTurismo = 'Dólar Turismo';
    return (
      <article>
        <table className='header-table'>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody>
            { expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ Number(exp.value).toFixed(2) }</td>
                <td>
                  { Object.values(exp.exchangeRates).map((exc) => {
                    let excCrr;
                    if (exc.code === exp.currency && exc.name !== dolarTurismo) {
                      excCrr = exc.name;
                    }
                    return excCrr;
                  })}
                </td>
                <td>
                  { Object.values(exp.exchangeRates).map((exc) => {
                    let excAsk;
                    if (exc.code === exp.currency && exc.name !== dolarTurismo) {
                      excAsk = (Number(exc.ask).toFixed(2));
                      console.log(excAsk);
                    }
                    return excAsk;
                  })}
                </td>
                <td>
                  { Object.values(exp.exchangeRates).map((exc) => {
                    let excValue;
                    if (exc.code === exp.currency && exc.name !== dolarTurismo) {
                      excValue = (Number(exp.value) * Number(exc.ask)).toFixed(2);
                    }
                    return excValue;
                  })}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editOnClick(exp) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteOnClick(exp.description) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (state) => dispatch(updateAction(state)),
});

ExpInfo.propTypes = {
  expenses: propTypes.arrayOf.isRequired,
  deleteDispatch: propTypes.func.isRequired,
  expForEdit: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpInfo);
