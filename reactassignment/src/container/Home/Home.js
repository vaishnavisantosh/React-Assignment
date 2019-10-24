import React, { Component } from 'react';
import axios from '../../axios-orders';
import { Menu } from 'semantic-ui-react';
import { Route,Link } from 'react-router-dom';
import PublicPost from '../../component/Post/PublicPosts';

class Home extends Component {

    state = {
        allPosts: [],
        publishedPost: []

    }

    componentDidMount() {
        axios.get('/posts.json')
            .then(res => {

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ allPosts: fetchedOrders })
                let arr = [];
                arr = fetchedOrders.filter(post => post.status == 'Published');
                this.setState({ publishedPost: arr });
            })

    }

    render() {


        return (
            <>

            <Menu>
                {
                    this.state.publishedPost.map(param => (

                        <Menu.Item
                            name={param.title}
                            as ={Link} to ={`/posts/${param.id}`}
                             />))
                }
            </Menu>
                <Route path="/posts/:id" component={PublicPost}/>
            </>
        );

    }
}



export default Home;
