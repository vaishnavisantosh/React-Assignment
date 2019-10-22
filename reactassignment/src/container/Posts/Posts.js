import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table,Button,Icon} from 'semantic-ui-react';
import Pagination from '../../component/UI/Pagination/Pagination';
import Post from '../../component/Post/Post';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import ErrorBoundry from '../../hoc/ErrorBoundary/ErrorBoundary';
import {withRouter,Link} from 'react-router-dom'

class Posts extends Component {

state = {
    posts:[],
    currentPage: 1,
  
    itemsPerPage: 2,
  };

componentDidMount () {
  this.setState({posts:this.props.posts})
  const userId = this.props.userId;
  const tokenId = localStorage.getItem('token');
    // alert(token);
    if(userId=='ZHW5wt3IP1ZoyPZgw0b12NCMv5B2'){
      axios.get('/posts.json')
      .then(res=>{ console.log("get of admin successful",res.data)
    this.setState({posts:res.data})});
    console.log("hiiiii",this.state.posts)
    }
    else{
  this.props.onFetchPost(userId,tokenId);
    }
}

goToCraectePage = (id) => {
  console.log("inside gotocreate");
  this.props.history.push(`/posts/${id || 'newPost'}`);
}

goToPreviewPage=(id)=>{
  console.log("inside preview");

  this.props.history.push(`/preview/${id}`);

}

onPageChange = (event, attrs) => {
  // let arr=this.props.posts;
  // console.log("object destructuring",arr)
  // let end = attrs.activePage * this.state.itemsPerPage;
  // let start = 0;
  // if (attrs.activePage === 2) {
  //     start = this.state.itemsPerPage;
  // } else {
  //     start = this.state.itemsPerPage * (attrs.activePage - 1);
  // }
  // console.log("inside pagination")
  const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
  const currentPosts = this.state.posts.slice(indexOfFirstTodo, indexOfLastTodo)
 
  //let posts = this.state.posts.slice(start, end);
  console.log(currentPosts);
  this.setState({ posts:currentPosts });
}

render () {
    let arr=[];
     const { posts } = this.state;


    
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
    
        
        // post =  arr.map( order => (
        //     <Post
        //        key={order.id}
        //        title={order.title}
        //        description={order.description}
        //        status={order.status}
        //        createdDate={order.createdDate}
        //        updatedDate={order.updatedDate}
        //        id={order.id}
        //         />
        // ) )
    
}

let table=null;
if(this.props.posts.length<=0){
  table=<div>
    no posts
  </div>
}

else{
table=
<>
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
post =  this.props.posts.map( order => (
            <Post
               key={order.id}
               title={order.title}
               description={order.description}
               status={order.status}
               createdDate={order.createdDate}
               updatedDate={order.updatedDate}
               id={order.id}
               handleEdit={this.goToCraectePage}
               handlePreview={this.goToPreviewPage}
                />
        ) )
    
} 
</Table.Body>


</Table>

        
          <Pagination

      totalPages={this.state.posts.length}
  
      onPageChange={this.onPageChange}
/></> 
}
    return (
        
       // console.log(this.props.posts)

        <div>
             <Button floated='right' icon labelPosition='left' primary size='small' onClick={() =>this.goToCraectePage()}>
         Add Post
      </Button>
      <ErrorBoundry>
        {table}

      </ErrorBoundry>

    
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

export default (connect( mapStateToProps, mapDispatchToProps )( Posts, axios )) ;



