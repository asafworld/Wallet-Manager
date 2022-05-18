import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  expensesSum = (totalValue) => {
    if (totalValue.length === 0) {
      return (<h6 data-testid="total-field">0</h6>);
    }
    const total = totalValue.reduce((a, b) => a + b);
    return (<h6 data-testid="total-field">{ total }</h6>);
  }

  render() {
    const { emailValue, totalValue } = this.props;
    console.log(emailValue);
    return (
      <article>
        <div>Hello, TrybeWallet!</div>
        <h4 data-testid="email-field">{ emailValue }</h4>
        <h6 data-testid="header-currency-field">BRL</h6>
        { this.expensesSum(totalValue) }
      </article>
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
