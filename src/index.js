import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import promise from 'redux-promise';
import PostsShow from './components/posts_show';


const createStoreWithMiddleware = applyMiddleware(
    promise
)(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PostsIndex}/>
            <Route path="posts/new" component={PostsNew} />
            <Route path="posts/:id" component={PostsShow} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));