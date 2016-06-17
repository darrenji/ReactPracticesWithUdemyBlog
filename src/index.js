import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import PostsIndex from './components/posts_index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const Greeting = () => {
  return <div>  Hey there</div>;
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PostsIndex}/>
            <Route path="greet" component={Greeting} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));