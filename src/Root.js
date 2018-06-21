import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import { PersistGate } from 'redux-persist/integration/react';

import App from './containers/App';

let {store,persistor} = configureStore();

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}