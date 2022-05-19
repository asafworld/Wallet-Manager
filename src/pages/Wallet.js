import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import walletAction from '../actions/walletAction';
import ExpForm from './ExpForm';

class Wallet extends React.Component {
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
  }

  render() {
    return (
      <article>
        <Header />
        <ExpForm />
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (state) => dispatch(walletAction(state)),
});

Wallet.propTypes = {
  dispatchCurrency: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
