import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import walletAction from '../actions/walletAction';
import ExpForm from './ExpForm';
import ExpInfo from './ExpInfo';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     value: '',
  //   };
  // }

  componentDidMount() {
    const { dispatchCurrency } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()
        .then((currencies) => {
          const currArr = Object.values(currencies).filter((e, i) => i !== 1);
          const currCodes = [];
          currArr.forEach((curr) => currCodes.push(curr.code));
          const obj = {
            currencies: currCodes,
            expenses: [],
          };
          dispatchCurrency(obj);
        }));
    // this.expensesSum();
  }

  // expensesSum = () => {
  //   const { totalValue } = this.props;
  //   console.log(totalValue);
  //   if (totalValue.length === 0) {
  //     this.setState({ value: 0 });
  //   } else {
  //     const value = totalValue.map((val) => {
  //       const expRates = Object.values(val.exchangeRates);
  //       const currency = expRates.find((curr) => curr.code === val.currency);
  //       return Number(val.value) * Number(currency.ask);
  //     });
  //     console.log(value);
  //     if (value.length === 0) {
  //       this.setState({ value: 0 });
  //     }
  //     const total = value.reduce((a, b) => a + b);
  //     this.setState({ value: total.toFixed(2) });
  //   }
  // }

  render() {
    const { value } = this.props;
    console.log(value);
    return (
      <article>
        <Header value={ value } />
        <ExpForm />
        <ExpInfo />
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (state) => dispatch(walletAction(state)),
});

const mapStateToProps = (state) => ({
  value: state.wallet.total,
});

Wallet.propTypes = {
  dispatchCurrency: propTypes.func.isRequired,
  value: propTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
