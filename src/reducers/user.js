// Esse reducer será responsável por tratar as informações da pessoa usuária
const userState = {
  email: '',
};

const user = (state = userState, action) => {
  switch (action.type) {
  case 'user':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
