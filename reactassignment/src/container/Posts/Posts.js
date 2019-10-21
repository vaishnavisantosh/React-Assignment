import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Pagination,Table,Button,Icon} from 'semantic-ui-react';

import Post from '../../component/Post/Post';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';



class Posts extends Component {

    

    state = {
        posts:[],
        page: 2,
        itemsPerPage: 10,
      };
    
    componentDidMount () {
        this.setState({posts:this.props.posts})
        const userId = this.props.userId;
        const tokenId = localStorage.getItem('token');
        // alert(token);
        this.props.onFetchPost(userId,tokenId);
    }

    
    setPageNum = (event, { activePage }) => {
        this.setState({ page: activePage });
      };
    render () {
        let arr=[];
         arr=this.props.posts;


        
    //     const itemsPerPage = 10;
    // let page= this.state.page;
    // let totalPages = 100 / itemsPerPage;
    // let posts = this.arr.slice(
    //   (page - 1) * itemsPerPage,
    //   (page - 1) * itemsPerPage + itemsPerPage
    // );
        console.log("inside container");
        console.log(this.props.posts)

        //console.log(this.props.post
        let post = <Spinner />;
        if ( !this.props.loading ) {
            
            console.log("post data",arr);
        
            
            post =  arr.map( order => (
                <Post
                   key={order.id}
                   title={order.title}
                   description={order.description}
                   status={order.status}
                   createdDate={order.createdDate}
                   updatedDate={order.updatedDate}
                   id={order.id}
                    />
            ) )
        
}
        return (
            
           // console.log(this.props.posts)

            <div>
                 <Button floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='user' /> Add Post
          </Button>
          
  <Table compact celled definition>
    <Table.Header>
      <Table.Row>
        
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>status</Table.HeaderCell>
        <Table.HeaderCell>Created Date</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
   {   
    post =  arr.map( order => (
                <Post
                   key={order.id}
                   title={order.title}
                   description={order.description}
                   status={order.status}
                   createdDate={order.createdDate}
                   updatedDate={order.updatedDate}
                   id={order.id}
                    />
            ) )
        
   } 
    </Table.Body>

    
  </Table>
  
            
                {/* <Pagination
          activePage={page}
          totalPages={totalPages}
          siblingRange={1}
          onPageChange={this.setPageNum}
        /> */}

        
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        loading: state.post.loading,
        userId: state.auth.userId,
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userId,tokenId) => dispatch(actions.fetchPost(userId,tokenId))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Posts, axios ) ;
