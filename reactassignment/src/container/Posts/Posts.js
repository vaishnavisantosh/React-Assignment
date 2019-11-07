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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let moment=require('moment');
//import * as moment from "moment";
const recordsPerPage=3;
class Posts extends Component {

  state = {
    posts: [],
    currentPage: 1,
    totalPages: 0,
    allPost:[],
    startDate:new Date(),
    endDate:new Date()
  };

  componentDidMount() {
    console.log("posts container called");


    const userId = this.props.userId;
    const tokenId = localStorage.getItem('token');
    // alert(token);
    if (localStorage.getItem('userType')==='admin') {
      axios.get('/posts.json')
        .then(res => {
        
        const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                this.setState({ posts: fetchedOrders.slice(0,recordsPerPage),allPost:fetchedOrders })
                this.setState({ totalPages: Math.ceil(fetchedOrders.length / recordsPerPage) });


          console.log("this state posts",this.state.posts)
        })
      
    }
    else {
      this.props.onFetchPost(userId, tokenId).then((res) => {
        this.setState({ posts: res.slice(0,recordsPerPage),allPost:res })
        this.setState({ totalPages: Math.ceil(res.length / recordsPerPage) });
        console.log("this state posts",this.state.posts)
      });
    }
  }

  handleConfirm = (id) => {
    console.log("key");
    console.log(this.props.id);


    axios.delete(`/posts/${id}.json`)
        .then( axios.get('/posts.json')
        .then(res => {
        
        const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                this.setState({ posts: fetchedOrders.slice(0,recordsPerPage),allPost:fetchedOrders })
                this.setState({ totalPages: Math.ceil(fetchedOrders.length / recordsPerPage) });


          console.log("this state posts",this.state.posts)
        }) )

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
    //const { recordsPerPage } = this.state;
    const fromIndex = (activePage - 1) ? ((activePage - 1) * recordsPerPage) : 0;
    const tillIndex = activePage * recordsPerPage;
    const arr = this.state.allPost.slice(fromIndex, tillIndex);
    //this.setState({ totalPages: Math.ceil(this.state.allPost.length / this.state.recordsPerPage) });

    this.setState({ posts: arr, currentPage: activePage });
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  filterByDate=()=>{
    let filteredArr=[];

    filteredArr=this.state.allPost.filter(post=>moment(post.createdDate).isBetween(this.state.startDate,this.state.endDate))

    this.setState({allPost:filteredArr})
    this.setState({ posts: this.state.allPost.slice(0,recordsPerPage)})
    this.setState({ totalPages: Math.ceil(this.state.allPost.length / recordsPerPage) });

    

    console.log(filteredArr);

  }

  sortByDate=()=>{
    let sortedArray=[];
    sortedArray=this.state.allPost.sort((a,b) => new moment(a.createdDate).format('YYYYMMDD') - new moment(b.createdDate).format('YYYYMMDD'));
    console.log("sorted array",sortedArray);
    this.setState({allPost:sortedArray})
    this.setState({ posts: this.state.allPost.slice(0,recordsPerPage)})
    this.setState({ totalPages: Math.ceil(this.state.allPost.length / recordsPerPage) });

  }
  render() {

    let arr = [];
    const { posts } = this.state;
    const userId = this.props.userId;
    console.log("inside posts container");
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
        <Button floated='right' icon labelPosition='left' primary size='small' onClick={() =>this.goToCraectePage()}>
          Add Post
      </Button>

      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleStartDateChange}
      />

<DatePicker
        selected={this.state.endDate}
        onChange={this.handleEndDateChange}
      />

<Button icon labelPosition='left' primary size='small' onClick={() =>this.filterByDate()}>
          Filter
      </Button>

      <Button icon labelPosition='left' primary size='small' onClick={()=>this.sortByDate()}>
            sort by created date
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



