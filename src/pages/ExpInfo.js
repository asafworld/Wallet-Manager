import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpInfo extends React.Component {
  render() {
    const { expenses } = this.props;
    // { value, currency, method, description, tag }
    const dolarTurismo = 'Dólar Turismo';
    return (
      <article>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            { expenses.length === 0 ? <h6>Sem despesas registradas</h6> : (
              expenses.map((exp) => (
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
                  <td />
                </tr>
              )))}
          </tbody>
        </table>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpInfo.propTypes = {
  expenses: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(ExpInfo);
