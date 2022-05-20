import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  expensesSum = () => {
    const { totalValue } = this.props;
    let total;
    if (totalValue.length === 0) {
      total = 0;
    } else {
      const value = totalValue.map((val) => {
        const expRates = Object.values(val.exchangeRates);
        const currency = expRates.find((curr) => curr.code === val.currency);
        return Number(val.value) * Number(currency.ask);
      });
      if (value.length === 0) {
        total = 0;
      }
      const totalSum = value.reduce((a, b) => a + b);
      total = totalSum.toFixed(2);
    }
    return total;
  }

  render() {
    const { emailValue } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div className="header-hello-user">
          <h2>Hello, TrybeWallet!</h2>
          <h4 data-testid="email-field">{ emailValue }</h4>
        </div>
        <div>
          <h6 data-testid="total-field">{ this.expensesSum() }</h6>
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
