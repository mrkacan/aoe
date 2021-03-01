import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { unitsReducer, IUnitsReducer } from './units';

const rootReducer = combineReducers({
    units: unitsReducer,
});

export interface IState {
    units: IUnitsReducer,
    router: RouterState,
}

export default rootReducer;
