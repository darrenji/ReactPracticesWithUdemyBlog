> npm install react-router@2.0.0-rc5 --save

<br>

> react-router是用来做什么的？

<br>

1. 用户改变url地址
2. 浏览器历史记录记录下这个变化
3. 告诉react-router,根据url更新react组件
4. 让react渲染组件
5. 呈现给页面

<br>

总之：react-router用来映射或管理url和component之间的关系。

<br>



> src/index.js

<br>

	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Provider } from 'react-redux';
	import { createStore, applyMiddleware } from 'redux';
	
	import App from './components/app';
	import reducers from './reducers';
	
	import { Router, Route, browserHistory, indexRoute } from 'react-router';
	
	const createStoreWithMiddleware = applyMiddleware()(createStore);
	
	ReactDOM.render(
	  <Provider store={createStoreWithMiddleware(reducers)}>
	    <Router history={browserHistory}>
	        <Route path="/" component={App} />
	    </Router>
	  </Provider>
	  , document.querySelector('.container'));

<br>

> localhost:8080

<br>




