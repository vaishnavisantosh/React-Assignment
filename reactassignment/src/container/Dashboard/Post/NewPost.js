import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Container,Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
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
        status: '',
        createdDate: '',
        updatedDate: ''
    }

    handleModelChange(content) {
        this.setState({ description: content });
    }

    changeHandler = (e) => {
        let form = { ...this.state }
        //console.log(e.target.name);
        this.setState(form[e.target.name] = e.target.value);
        //console.log(e.target.value);
    }
    submitHandler = (event) => {
        // event.preventDefault();
        
        // this.props.onCreatePost(this.state.title, this.state.form.description, this.state.status);
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
                    onChange={this.changeHandler}
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

// const mapStateToProps = state => {
//     return
//     {
//         UserId: state.UserId
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return
//     {
//         onCreatePost:()=>dispatch();


//     }
// };








export default NewPost;
