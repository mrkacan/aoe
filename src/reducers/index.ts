import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { counterReducer, ICounterReducer } from './counter';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export interface IState {
    counter: ICounterReducer,
    router: RouterState,
}

export default rootReducer;
