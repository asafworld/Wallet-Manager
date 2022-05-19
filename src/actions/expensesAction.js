const expensesAction = (payload, exchangeRates) => ({
  type: 'expenses',
  payload,
  exchangeRates });

const fetchAsk = (payload) => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  dispatch(expensesAction(payload, response));
};

export default fetchAsk;
