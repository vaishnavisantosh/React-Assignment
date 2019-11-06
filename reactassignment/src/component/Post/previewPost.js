import ReactHtmlParser from 'react-html-parser';
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Axios from '../../axios-orders';

//var moment = require('moment');

class PreviewPost extends Component {
    state = {
        title: '',
        description: '',
        status: 'Draft',
        createdDate: '',
        updatedDate: ''
    }

    componentDidMount() {
        console.log("params", this.props.match.params);
        if (this.props.match.params.id !== 'newPost') {
            Axios.get(`/posts/${this.props.match.params.id}.json`)
                .then((response) => {

                    this.setState({ title: response.data.title, description: response.data.description, status: response.data.status, createdDate: response.data.createdDate, updatedDate: response.data.updatedDate })
                    console.log(response.data);
                })
        }
    }

    render() {
        console.log("inside preview component");

        let { title, description, status, createdDate, updatedDate } = this.state;

        let Post =
            <>
                <Form onSubmit={this.submitHandlerForEdit}>
                  Title:  <Form.Input
                        fluid
                        placeholder='Title'
                        value={title}
                        name="title"
                    />
                  
                    <div>
                    Description:   {ReactHtmlParser(description)}
                    </div>
                   <br></br>
                    Status:
                    <Form.Input
                        fluid
                        placeholder='status'
                        value={status}
                    />
                    Created Date:
                    <Form.Input
                        fluid
                        placeholder='created Date'
                        value={createdDate}
                    />
                    Updated Date:
                    <Form.Input
                        fluid
                        placeholder='Updated date'
                        value={updatedDate}
                    />

                    <br></br>
                    <Button color='teal' fluid size='large'> OK </Button>
                </Form>

            </>

        return (
            <div>
                {Post}
            </div>

        );
    }
}
export default PreviewPost;


