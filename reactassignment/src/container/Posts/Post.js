import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../component/Post/Posts';
import axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component {

    
    componentDidMount () {
        const userId = this.props.userId;
        const tokenId = localStorage.getItem('token');
        // alert(token);
        this.props.onFetchPost(userId,tokenId);
    }

    render () {
        console.log("inside container");
        console.log(this.props.posts)

        //console.log(this.props.posts)
        let post = <Spinner />;
        if ( !this.props.loading ) {
            let arr=this.props.posts;
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

           // console.log({post});
       }
        return (
            
           // console.log(this.props.posts)

            <div>
                {post}
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

export default connect( mapStateToProps, mapDispatchToProps )( Orders, axios ) ;