import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  expensesSum = (totalValue) => {
    if (totalValue.length === 0) {
      return (<h6 data-testid="total-field">0</h6>);
    }
    const value = totalValue.map((val) => {
      const expRates = Object.values(val.exchangeRates);
      const currency = expRates.find((curr) => curr.code === val.currency);
      console.log(currency.ask);
      return Number(val.value) * Number(currency.ask);
    });
    console.log(value);
    if (value.length === 0) {
      return (<h6 data-testid="total-field">0</h6>);
    }
    const total = value.reduce((a, b) => a + b);
    return (<h6 data-testid="total-field">{ total.toFixed(2) }</h6>);
  }

  render() {
    const { emailValue, totalValue } = this.props;
    console.log(emailValue);
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div className="header-hello-user">
          <h2>Hello, TrybeWallet!</h2>
          <h4 data-testid="email-field">{ emailValue }</h4>
        </div>
        <div>
          { this.expensesSum(totalValue) }
          <br />
          <h6 data-testid="header-currency-field">BRL</h6>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailValue: state.user.email,
  totalValue: state.wallet.expenses,
});

Header.propTypes = {
  emailValue: propTypes.string.isRequired,
  totalValue: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
