import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Container, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import Axios from '../../axios-orders';

var moment = require('moment');

class NewPost extends Component {

    state = {
        title: '',
        description: '',
        status: 'Draft',

    }

    componentDidMount() {
        console.log("params", this.props.match.params);
        if (this.props.match.params.id !== 'newPost') {
            Axios.get(`/posts/${this.props.match.params.id}.json`)
                .then((response) => {
                    this.setState({ title: response.data.title, description: response.data.description });
                    console.log("newPost", response.data);

                })
        }
    }

    handleModelChange = (content) => {
        this.setState({ description: content });
    }

    changeTitleHandler = (e) => {

        this.setState({ title: e.target.value });
        //console.log(e.target.value);
    }

    submitHandlerForEdit = (event) => {
        event.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            updatedDate: moment().format('LL')

        }
        Axios.patch(`/posts/${this.props.match.params.id}.json`, data)
            .then("successful edited");
        console.log("inside edit");
    }

    submitHandlerForCreate = (event) => {
        event.preventDefault();
        let userId = this.props.id;
        this.props.onPost(this.state.title, this.state.description, this.state.status, userId);
        console.log("inside submit");
    }

    render() {

        let { title, status } = this.state;
        let Post = null;
        if (this.props.match.params.id !== 'newPost') {
            Post =
                <Form onSubmit={this.submitHandlerForEdit}>
                    <Form.Input
                        fluid
                        placeholder='Title'
                        value={this.state.title}
                        name="title"

                    />
                    <FroalaEditor
                        model={this.state.description}
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
                    <Button color='teal' fluid size='large'> Save Post </Button>
                </Form>
        }
        else {


            Post =
                <Form onSubmit={this.submitHandlerForCreate}>
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

        }
        return (
            <div>
                {Post}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPost: (title, description, status, id) => dispatch(actions.post(title, description, status, id)),
    };
};








export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));
