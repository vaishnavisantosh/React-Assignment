import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';

class Post extends Component {
    handleConfirm = () => {
        console.log("key");
        console.log(this.props.id);


        Axios.delete(`/posts/${this.props.id}.json`)
            .then(response => {
                const userId = this.props.userId;
                const tokenId = localStorage.getItem('token');

                this.props.onFetchPost(userId, tokenId)
            })

    }

    render() {

        return (
            <Table.Row>

                <Table.Cell>{this.props.title}</Table.Cell>
                <Table.Cell>{this.props.status}</Table.Cell>
                <Table.Cell>{this.props.createdDate}</Table.Cell>
                <Table.Cell>
                    <Button circular link onClick={() => this.props.handleEdit(this.props.id)} icon='edit'  ></Button>
                    <Button circular icon='trash' key={this.props.key} onClick={this.handleConfirm} ></Button>
                    <Button circular icon='eye' link onClick={() => this.props.handlePreview(this.props.id)}></Button>
                </Table.Cell>

            </Table.Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userId, tokenId) => dispatch(actions.fetchPost(userId, tokenId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));