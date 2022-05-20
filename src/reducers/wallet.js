// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = walletState, action) => {
  switch (action.type) {
  case 'wallet':
    return { ...state, ...action.payload };
  case 'expenses':
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload,
          id: state.expenses.length,
          exchangeRates: action.exchangeRates }] };
  case 'update':
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
};

export default wallet;
