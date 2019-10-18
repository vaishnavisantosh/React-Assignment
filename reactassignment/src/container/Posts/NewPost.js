import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Container,Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.

import FroalaEditor from 'react-froala-wysiwyg';
// var moment = require('moment');

class NewPost extends Component {


    constructor(props) {
        super(props);
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    state = {
        title: '',
        description: '',
        status: 'Draft',
       
    }

    handleModelChange(content) {
        this.setState({ description: content });
    }

    changeTitleHandler = (e) => {
        
        this.setState( {title:e.target.value});
        //console.log(e.target.value);
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        let userId=this.props.id;
         this.props.onPost(this.state.title, this.state.description, this.state.status,userId);
        console.log("inside submit");
      }

    render() {

        let { title, status } = this.state;



        return (
        <Form onSubmit={this.submitHandler}>
                <Form.Input
                    fluid
                    placeholder='Title'
                    value={title}
                    name="title"
                    onChange={this.changeTitleHandler}
                />
                <FroalaEditor
                    //model={null}
                    onModelChange={this.handleModelChange}
                />
                <br></br>

                {/* <Form.Field>
                    <Radio
                        label='Draft'
                        name='status'
                        value='Draft'
                        checked={this.state.status}
                        onChange={this.changeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Publish'
                        name='Status'
                        value='Publish'
                        checked={status}
                        onChange={this.changeHandler}
                    />
                </Form.Field> */}

                <br></br>
                <Button color='teal' fluid size='large'> Create Post </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
     id:state.auth.userId
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onPost: (title, description,status,id) => dispatch(actions.post(title, description, status,id)),
    };
  };








export default connect(mapStateToProps,mapDispatchToProps) (NewPost);
