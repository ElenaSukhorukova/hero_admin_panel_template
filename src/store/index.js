import { configureStore } from 'redux';
import reducer from '../reducers';

const store = configureStore({ reducer: reducer });

export default store;
