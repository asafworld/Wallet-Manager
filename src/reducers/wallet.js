// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletState = {
  currencies: [],
  expenses: [],
};

const nextId = (expenses) => {
  if (expenses.length === 0) {
    return 0;
  }
  const lastOne = expenses[expenses.length - 1];
  return lastOne.id + 1;
};

const wallet = (state = walletState, action) => {
  const newExpenses = [...state.expenses];
  switch (action.type) {
  case 'wallet':
    return { ...state, ...action.payload };
  case 'expenses':
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload,
          id: nextId(state.expenses),
          exchangeRates: action.exchangeRates }] };
  case 'update':
    return { ...state, expenses: action.payload };
  case 'edit':
    newExpenses[action.id] = action.payload;
    return { ...state, expenses: newExpenses };
  default:
    return state;
  }
};

export default wallet;
