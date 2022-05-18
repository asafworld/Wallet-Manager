import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import userAction from '../actions/userAction';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      email: '',
      password: '',
    };
  }

  disabledFunc = (event) => {
    const numberPass = event.target.value.split('').length;
    const five = 5;
    const emailVerif = this.emailVerification();
    if (numberPass <= five || emailVerif === false) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  };

  emailVerification = () => {
    const { email } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const booleanValue = regex.test(email);
    console.log(booleanValue);
    return booleanValue;
  }

  onChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onChangePass = (event) => {
    this.setState({ password: event.target.value });
    this.disabledFunc(event);
  }

  render() {
    const { disable, email, password } = this.state;
    const { history, dispatchEmail } = this.props;
    return (
      <article>
        <form>
          <label htmlFor="email-input">
            Login
            <input
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              data-testid="email-input"
              id="email-input"
              value={ email }
              onChange={ (event) => this.onChange(event) }
            />
          </label>
          <hr />
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              min="6"
              value={ password }
              onChange={ (event) => this.onChangePass(event) }
            />
          </label>
          <button
            disabled={ disable }
            type="button"
            onClick={ () => {
              dispatchEmail(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (state) => dispatch(userAction(state)),
});

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  dispatchEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
