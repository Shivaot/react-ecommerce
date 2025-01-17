import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from './store/reducers/auth';
import categoriesReducer from './store/reducers/categories';
import productsReducer from './store/reducers/products';
import productDetailReducer from './store/reducers/productDetail';
import cartReducer from './store/reducers/cart';

const composeEnhancers =
	(process.env.NODE_ENV === "development" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const rootReducer = combineReducers({
	auth: authReducer,
	categories: categoriesReducer,
	products: productsReducer,
	productDetail: productDetailReducer,
	cart: cartReducer
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
	  <BrowserRouter>
  		<App />
  	</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
