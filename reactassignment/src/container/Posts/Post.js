import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../component/Post/Posts';
import axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchPost( this.props.userId);
    }

    render () {
        let post = <Spinner />;
        if ( !this.props.loading ) {
            post = this.props.posts.map( order => (
                <Post
                   title={order.title}
                   description={order.description}
                   status={order.status}
                   createdDate={order.createdDate}
                   updatedDate={order.updatedDate}
                    />
            ) )
        }
        return (
            <div>
                {post}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        //loading: state.order.loading,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userId) => dispatch( actions.fetchPost( userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Orders, axios ) ;