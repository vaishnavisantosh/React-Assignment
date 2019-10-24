import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';

class Post extends Component {
   
    render() {
        let isAdmin;
        
        if(localStorage.getItem('userType')==='admin')
        {
            isAdmin=true
        }
        else{
            isAdmin=false
        }
        return (
            <Table.Row>

                <Table.Cell>{this.props.title}</Table.Cell>
                <Table.Cell>{this.props.status}</Table.Cell>
                <Table.Cell>{this.props.createdDate}</Table.Cell>
                <Table.Cell>
                    <Button circular link onClick={() => this.props.handleEdit(this.props.id)} icon='edit'  ></Button>
                    {isAdmin && (
                        <Button circular link icon='trash'  onClick={() => this.props.handleDelete(this.props.id)} ></Button>                    )

                    }
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