import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import walletAction from '../actions/walletAction';
import ExpForm from './ExpForm';
import ExpInfo from './ExpInfo';
import EditExpense from './EditExpense';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editedExp: {},
      inEdit: false,
    };
  }

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

  expForEdit = (exp) => {
    this.setState({
      editedExp: exp,
      inEdit: true,
    });
  }

  inEditFunc = () => {
    this.setState({ inEdit: false });
  }

  render() {
    const { value } = this.props;
    const { editedExp, inEdit } = this.state;
    console.log(value);
    return (
      <article>
        <Header value={ value } />
        { !inEdit ? <ExpForm /> : (
          <EditExpense
            editedExp={ editedExp }
            inEditFunc={ this.inEditFunc }
          />)}
        <ExpInfo expForEdit={ this.expForEdit } />
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
