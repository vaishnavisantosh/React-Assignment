import React , {Component} from 'react'
import { Card, Icon,Button,Confirm } from 'semantic-ui-react'
import Axios from '../../axios-orders';
//import { NavLink } from 'react-router-dom';

//import moment from "moment"

class Posts extends Component {

    // state={
    //     open: false
    // }

    

    handleConfirm = () =>{
        console.log("key");     
        console.log(this.props.id);
        Axios.delete(`/posts/${this.props.id}.json`)
        .then(response=>{
            console.log("inside response",response)});
        // }).then(
        // this.setState({open:false}));
        // }
    //handleCancel = () => this.setState({  open: false })
    //show = () => this.setState({ open: true })
        }




render(){
    
    return (
        <Card.Group>
            
                {/* //let updatedDate = moment(moment.utc(new Date(post.updated_on * 1000)), "YYYYMMDD").fromNow(); */}

                    <Card >
                        <Card.Content>
                            {/* <NavLink
                                style={{ display: "inline-block" }}
                                to={'/posts/' + post.Id}>
                                <Card.Header>
                                    {post.Name} &nbsp;
                                </Card.Header>
                            </NavLink> */}
                            <Card.Meta>
                                <span>{this.props.title}</span>
                            </Card.Meta>
                            <Card.Description content={this.props.description} />
                            <Card.Meta>
                                <span>{this.props.status}</span>
                            </Card.Meta>

                            <Card.Meta>
                                <span>{this.props.createdDate}</span>
                            </Card.Meta>
                            <Card.Meta>
                                <span>{this.props.updatedDate}</span>
                            </Card.Meta>
                        </Card.Content>
                        <Button key={this.props.key} onClick={this.handleConfirm}>Delete</Button>
        
                        {/* <Card.Content extra>
                            {/* <ConfirmationModal
                                iconType="remove circle"
                                modalTitle="Delete Post"
                                ConfirmationMessage="Are you sure, you want to delete this post?"
                                rejectionClick={() => { console.log("clicked") }}
                                confirmationClick={() => { props.clicked(post.Id) }} />
                                &nbsp; */}
                              {/* <NavLink
                                style={{ display: "inline-block" }}
                                to={nextPage}> */}
                                {/* <Icon name='edit outline' size="large" /> */}
                            {/* </NavLink>  */}
                            {/* <span style={{ float: "right" }}>{updatedDate}</span>
                        </Card.Content> */}  
                    </Card>
                
          
        </Card.Group>
    )
}
}

export default Posts;