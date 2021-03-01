import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from './App';
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from "./pages/Home";
import '@testing-library/jest-dom';


const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        ),
    ),
);

sagaMiddleware.run(rootSaga);

const MainApp = <Provider store={store}>
    <App history={history}/>
</Provider>;

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(MainApp, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('renders home image', () => {
    render(<Home/>);
    expect(screen.getByAltText('age of empires 2')).toBeInTheDocument();
});

it('renders units page with data', async () => {
    render(MainApp);
    const element = screen.getByTestId('nav-units-button-/units');

    fireEvent.click(element);
    await waitFor(() => expect(screen.getByTestId('units-content-table')).toBeInTheDocument(), {
        interval: 400
    });

    expect(screen.getByTestId('Imperial')).toBeInTheDocument();
});

it('renders unit detail page with data', async () => {
    render(MainApp);
    const element = screen.getByTestId('nav-units-button-/units');

    fireEvent.click(element);


    await waitFor(() => expect(screen.getByTestId('units-content-table')).toBeInTheDocument(), {
        interval: 400
    });

    const unitItem = screen.getByTestId('unit_table_item_1');

    fireEvent.click(unitItem);

    await waitFor(() => expect(screen.getByTestId('unit-detail-table')).toBeInTheDocument(), {
        interval: 400
    });

    expect(screen.getByTestId('age')).toBeInTheDocument();
});