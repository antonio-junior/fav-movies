import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import App from './main/app'
import reducers from './main/reducers'

import './styles/custom.css'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
    </Provider>
    , document.getElementById('app'))