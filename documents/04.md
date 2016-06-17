> npm install axios redux-promise --save

<br>

当react与redux结合，故事的主人公大致有：action、component、connect、reducer、createStore、middleware 等等。这些主人公大致职责是：

<br>

1. createStore: 默认情况下，redux的createStore管理着状态，可以通过它的getState方法获取当前状态，可以通过subscribe方法注册事件，可以通过dispatch方法更改状态(做2件事：通过reducer更改状态；执行subscribe执行的事件)
2. applyMiddleware: 当在action与reducer之间需要middleware的时候，createStore作为实参传递给它
3. middleware: 介于action和reducer之间
4. action:返回一个对象，通常是promise
5. connect:把action加到component上去，component于是变成了connect component
6. reducer:接受action,处理状态

<br>

大致流程是：

<br>

1. action与component映射绑定起来
2. 触发component上的方法，action执行起来
3. action返回一个对象，类似{type: "ADD_TODO", payload: request}
4. action返回的对象进过middleware
5. action放回的结果来到交给reducer
6. reducer更改状态，其实内部触发createStore的dispatch方法，不仅让reducer更改状态，还让通过subscribe注册的事件重新执行一遍，而渲染组件的过程就是被注册的事件

<br>

由于，action中通过axios获取的数据时promise,所有，这里需要redux-promise这个middleare把获取的promise转换成实实在在的数据，再交给reducer。首先把createStore交给applyMiddleare.

<br>

> src/index.js

<br>

	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Provider } from 'react-redux';
	import { createStore, applyMiddleware } from 'redux';
	
	import App from './components/app';
	import reducers from './reducers';
	
	import { Router, Route, browserHistory, IndexRoute } from 'react-router';
	import PostsIndex from './components/posts_index';
	import promise from 'redux-promise';
	
	const createStoreWithMiddleware = applyMiddleware(
	    promise
	)(createStore);
	
	
	
	ReactDOM.render(
	  <Provider store={createStoreWithMiddleware(reducers)}>
	    <Router history={browserHistory}>
	        <Route path="/" component={App}>
	            <IndexRoute component={PostsIndex}/>
	        </Route>
	    </Router>
	  </Provider>
	  , document.querySelector('.container'));

<br>

**action用来获取返回数据。**

<br>

> src/actions/index.js

<br>

	import axios from 'axios';
	
	export const FETCH_POSTS = 'FETCH_POSTS';
	const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
	const API_KEY = '?key=lkajdsfapipwietpw';
	
	export function fetchPosts(){
	    
	    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	    return {
	        type: FETCH_POSTS,
	        payload: request
	    };
	}
本来，action返回的结果是promise再交给reducer的，但现在因为使用了redux-promise这个middleare，数据到reducer之后就是实实在在的数据。

<br>

**reducer就是用来维护状态。**

<br>

> src/reducers/reducer_posts.js

<br>

	import { FETCH_POSTS } from '../actions/index';
	
	const INITIAL_STATE = {all: [], post: null};
	
	export default function(state = INITIAL_STATE, action){
	    switch(action.type){
	        case FETCH_POSTS:
	            return {...state, all: action.payload.data}
	        default:
	            return state;
	    }
	}

<br>

**reducer是需要注册的。**

<br>

> src/reducers/index.js

<br>

	import { combineReducers } from 'redux';
	import PostsReducer from './reducer_posts';
	
	const rootReducer = combineReducers({
	   posts: PostsReducer
	});
	
	export default rootReducer;

<br>

**在组件中，需要和action进行绑定或映射。**

<br>

	import React, { Component } from 'react';
	import { connect } from 'react-redux';
	import { bindActionCreators } from 'redux';
	import { fetchPosts } from '../actions/index';
	
	class PostsIndex extends Component{
	    
	    componentWillMount(){
	//        console.log('this would be a good time to call an action creator to fetch posts');
	        this.props.fetchPosts();
	    }
	    
	    render(){
	        return (
	            <div>List of blog posts</div>
	        );
	    }
	}
	
	//function mapDispatchToProps(dispatch){
	//    return bindActionCreators({ fetchPosts }, dispatch);
	//}
	
	//export default connect(null, mapDispatchToProps)(PostsIndex);
	
	export default connect(null, {fetchPosts:fetchPosts})(PostsIndex);

- 通过组件的componentWillMount事件触发了action
- 通过connect把组件和action或state链接起来，成为了connect component

<br>

> localhost:8080

<br>

在控制台的network里能看到数据了。

<br>






