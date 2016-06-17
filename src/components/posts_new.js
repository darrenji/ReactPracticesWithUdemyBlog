import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component{
    render(){
        
        //const title = this.props.fields.title;
        const { fields: {title, categories, content }, handleSubmit } = this.props;
        
        
        
        return (
            <form onSubmit={handleSubmit(this.props.createPost)}>
                <h3>Create A New Post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                </div>
            
                <div className="form-group">
                    <label>Catgories</label>
                    <input type="text" className="form-control" {...categories} />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea className="form-control"  {...content} />
                </div>  
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

// connect:第一个参数是mapStateToProps, 第二个参数是mapDispatchToProps
// reduxForm:第一个参数是config, 第二个参数是mapStateToProps, 第三个参数是mapDispatchToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew);

