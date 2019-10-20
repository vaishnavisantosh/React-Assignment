import React , {Component} from 'react'
import { Card, Icon,Button,Confirm,Table } from 'semantic-ui-react'
import Axios from '../../axios-orders';
//import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {NavLink} from 'react-router-dom';



//import moment from "moment"

class Post extends Component {

     

 


 handleConfirm = () =>{
        console.log("key");     
        console.log(this.props.id);
        
        
        Axios.delete(`/posts/${this.props.id}.json`)
        .then(response=>{
            const userId = this.props.userId;
        const tokenId = localStorage.getItem('token');
        // alert(token);
        this.props.onFetchPost(userId,tokenId)})
        
            
            // let index=this.state.posts.findIndex((num)=>{ return num.id==this.props.id});
            // console.log(index);

            // let updatedPosts=this.state.posts.splice(index,1);


            //this.setState({posts:updatedPosts});
           // console.log(this.state.posts);

            


        }




render(){
    
    return (
        // <Card.Group>
            
        //         {/* //let updatedDate = moment(moment.utc(new Date(post.updated_on * 1000)), "YYYYMMDD").fromNow(); */}

        //             <Card >
        //                 <Card.Content>
        //                     {/* <NavLink
        //                         style={{ display: "inline-block" }}
        //                         to={'/posts/' + post.Id}>
        //                         <Card.Header>
        //                             {post.Name} &nbsp;
        //                         </Card.Header>
        //                     </NavLink> */}
        //                     <Card.Meta>
        //                         <span>{this.props.title}</span>
        //                     </Card.Meta>
        //                     <Card.Description content={this.props.description} />
        //                     <Card.Meta>
        //                         <span>{this.props.status}</span>
        //                     </Card.Meta>

        //                     <Card.Meta>
        //                         <span>{this.props.createdDate}</span>
        //                     </Card.Meta>
        //                     <Card.Meta>
        //                         <span>{this.props.updatedDate}</span>
        //                     </Card.Meta>
        //                 </Card.Content>
        //                 <Button key={this.props.key} onClick={this.handleConfirm}>Delete</Button>
        //                  {/* <NavLink
        //                         style={{ display: "inline-block" }}
        //                         to={nextPage}>
        //                         <Icon name='edit outline' size="large" /> 
        //                      </NavLink>  */}

        
        //                 {/* <Card.Content extra>
        //                     {/* <ConfirmationModal
        //                         iconType="remove circle"
        //                         modalTitle="Delete Post"
        //                         ConfirmationMessage="Are you sure, you want to delete this post?"
        //                         rejectionClick={() => { console.log("clicked") }}
        //                         confirmationClick={() => { props.clicked(post.Id) }} />
        //                         &nbsp; */}
        //                       {/* { */}
        //                  {/* <span style={{ float: "right" }}>{updatedDate}</span>
        //                 // </Card.Content> */}  
        //             </Card>
                
          
        // </Card.Group>

        <Table.Row>
       
        <Table.Cell>{this.props.title}</Table.Cell>
        <Table.Cell>{this.props.status}</Table.Cell>
        <Table.Cell>{this.props.createdDate}</Table.Cell>
        <Table.Cell>
        <Button circular icon='edit'  ></Button>
        <Button circular icon='trash' key={this.props.key} onClick={this.handleConfirm} ></Button>
        <Button circular icon='eye'></Button>


        </Table.Cell>

      </Table.Row> 


    )
}
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,

        userId: state.auth.userId,
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userId,tokenId) => dispatch(actions.fetchPost(userId,tokenId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Post);