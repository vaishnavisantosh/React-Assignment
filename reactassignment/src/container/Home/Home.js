import React, { useState,useEffect } from 'react';
import axios from '../../axios-orders';
import { Menu } from 'semantic-ui-react';
import { Route,Link } from 'react-router-dom';
import PublicPost from '../../component/Post/PublicPosts';

const Home =(props)=> {

    //const[allposts,setAllposts]=useState([]);
    const[publishedPost,setPublishedPost]=useState([]);


    useEffect(() =>{
        axios.get('/posts.json')
            .then(res => {

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
              //  setAllposts({fetchedOrders})
                let arr = [];
                arr = fetchedOrders.filter(post => post.status === 'Published');
                setPublishedPost({arr})
            })

    },[]);




        return (
            <>

            <Menu>
                {
                    publishedPost.map(param => (

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




export default Home;
