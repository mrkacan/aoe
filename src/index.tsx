import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from "redux-saga";
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from "./sagas";
import './styles/shared.scss';

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

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      store,
    };
  }

  public render() {
    return (
      <Provider store={store}>
          <App history={history} />
      </Provider>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
