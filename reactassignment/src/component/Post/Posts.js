import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

//import moment from "moment"

const posts = (props) => {
    
    return (
        <Card.Group>
            {props.posts.map(post => {
                //let updatedDate = moment(moment.utc(new Date(post.updated_on * 1000)), "YYYYMMDD").fromNow();
                return (
                    <Card key={post.Id}>
                        <Card.Content>
                            {/* <NavLink
                                style={{ display: "inline-block" }}
                                to={'/posts/' + post.Id}>
                                <Card.Header>
                                    {post.Name} &nbsp;
                                </Card.Header>
                            </NavLink> */}
                            <Card.Meta>
                                <span>{post.Author}</span>
                            </Card.Meta>
                            <Card.Description content={post.Description} />
                        </Card.Content>
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
                                <Icon name='edit outline' size="large" />
                            {/* </NavLink>  */}
                            {/* <span style={{ float: "right" }}>{updatedDate}</span>
                        </Card.Content> */}  */}
                    </Card>
                )
            })}
        </Card.Group>
    )
}

export default posts;