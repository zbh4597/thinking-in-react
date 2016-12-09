import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './components/FilterableProductTable';

require('./styles/main.scss');

let PRODUCTS = require('./data.json');

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('content'));