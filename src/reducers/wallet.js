// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = walletState, action) => {
  switch (action.type) {
  case 'wallet':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default wallet;
