import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import Pagination from '../../component/UI/Pagination/Pagination';
import Post from '../../component/Post/Post';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import ErrorBoundry from '../../hoc/ErrorBoundary/ErrorBoundary';

class Posts extends Component {

  state = {
    posts: [],
    currentPage: 1,
    totalPages: 0,
    recordsPerPage: 3,
    allPost:[]
  };

  componentDidMount() {

    const userId = this.props.userId;
    const tokenId = localStorage.getItem('token');
    // alert(token);
    if (localStorage.getItem('userType')==='admin') {
      axios.get('/posts.json')
        .then(res => {
        //   //console.log("get of admin successful", res.data)
        //   //console.log(Object.keys(res.data))
        // const arr=Object.entries(res.data).map(([key, value]) => ({key,value}))
        //   
        const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                this.setState({ posts: fetchedOrders.slice(0,this.state.recordsPerPage),allPost:fetchedOrders })
                this.setState({ totalPages: Math.ceil(fetchedOrders.length / this.state.recordsPerPage) });


          console.log("this state posts",this.state.posts)
        })
      
    }
    else {
      this.props.onFetchPost(userId, tokenId).then((res) => {
        this.setState({ posts: res.slice(0, this.state.recordsPerPage),allPost:res })
        this.setState({ totalPages: Math.ceil(res.length / this.state.recordsPerPage) });
        console.log("this state posts",this.state.posts)
      });
    }
  }

  handleConfirm = (id) => {
    console.log("key");
    console.log(this.props.id);


    axios.delete(`/posts/${id}.json`)
        .then(response => {
            const userId = this.props.userId;
            const tokenId = localStorage.getItem('token');

            this.props.onFetchPost(userId, tokenId).then(response=>{
              this.setState({posts:response,allPost:response})
            }
              
            )
            console.log("inside delete")
        })

}


  goToCraectePage = (id) => {
    console.log("inside gotocreate");
    this.props.history.push(`/app/posts/${id || 'newPost'}`);
  }

  goToPreviewPage = (id) => {
    console.log("inside preview");

    this.props.history.push(`/app/preview/${id}`);

  }

  onPageChange = ({ activePage }) => {

    console.log("activePage", activePage)
    const { recordsPerPage } = this.state;
    const fromIndex = (activePage - 1) ? ((activePage - 1) * recordsPerPage) : 0;
    const tillIndex = activePage * recordsPerPage;
    const arr = this.state.allPost.slice(fromIndex, tillIndex);
    this.setState({ posts: arr, currentPage: activePage });
  }

  render() {
    let arr = [];
    const { posts } = this.state;
    const userId = this.props.userId;
    console.log("inside container");
    console.log(this.props)

    //console.log(this.props.post
    let post = <Spinner />;
    if (!this.props.loading) {

      console.log("post data", arr);
    }

    let table = null;
    if (this.state.allPost.length <= 0) {
      table = <div>
        no posts
  </div>
    }

    else {

      if(localStorage.getItem('userType')==='admin'){
        table =
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
                post = this.state.posts.map(order => (
                  <Post
                    key={order.id}
                    title={order.title}
                    description={order.description}
                    status={order.status}
                    createdDate={order.createdDate}
                    updatedDate={order.updatedDate}
                    id={order.id}
                    handleDelete={this.handleConfirm}
                    handleEdit={this.goToCraectePage}
                    handlePreview={this.goToPreviewPage}
                  />
                ))

              }
            </Table.Body>


          </Table>


          </>

      }

      else{


      table =
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
                post = this.state.posts.map(order => (
                  <Post
                    key={order.id}
                    title={order.title}
                    description={order.description}
                    status={order.status}
                    createdDate={order.createdDate}
                    updatedDate={order.updatedDate}
                    id={order.id}
                    handleDelete={this.handleConfirm}
                    handleEdit={this.goToCraectePage}
                    handlePreview={this.goToPreviewPage}
                  />
                ))

              }
            </Table.Body>


          </Table>


         
          </>
            }
    }
    return (

      // console.log(this.props.posts)
      <>
      <div>
        <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.goToCraectePage()}>
          Add Post
      </Button>
        <ErrorBoundry>
          {table}
          <Pagination
            activePage={this.state.currentPage}
            totalPages={this.state.totalPages}
            onPageChange={(e, data) => this.onPageChange(data)}
          />
        </ErrorBoundry>


      </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPost: (userId, tokenId) => dispatch(actions.fetchPost(userId, tokenId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts, axios));



