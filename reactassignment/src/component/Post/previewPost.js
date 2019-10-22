import ReactHtmlParser from 'react-html-parser';


import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';


import Axios from '../../axios-orders';

var moment = require('moment');

class PreviewPost extends Component {
state = {
        title: '',
        description: '',
        status: 'Draft',
        createdDate:'',
        updatedDate:''
       
    }

    componentDidMount() {
        console.log("params",this.props.match.params );
        if (this.props.match.params.id !== 'newPost') {     
            Axios.get(`/posts/${this.props.match.params.id}.json`)
            .then((response)=>{
               
                this.setState({title:response.data.title,description:response.data.description,status:response.data.status,createdDate:response.data.createdDate,updatedDate:response.data.updatedDate})
                console.log(response.data);
            })
        }
    }

    render() {

        let { title,description, status,createdDate,updatedDate } = this.state;
    //    const des=<div dangerouslySetInnerHTML={{ __html: description }} />
      // console.log("description",description);
       
   let Post=
   <>
       <Form onSubmit={this.submitHandlerForEdit}>
        <Form.Input
            fluid
            placeholder='Title'
            value={title}
            name="title"
            
        />
       <div>
       {ReactHtmlParser(description)}
       </div>
       

           
        
        <Form.Input
            fluid
            placeholder='status'
            value={status}
            
            
        />
        

        <Form.Input
            fluid
            placeholder='created Date'
            value={createdDate}
            
            
        />
        
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


