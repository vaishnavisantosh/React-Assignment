import React, { useEffect,useState } from 'react';
import axios from '../../axios-orders';
import { Card, Icon, Image } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser';


const PublicPosts =(props)=> {

    const[title,setTitle]=useState("")
    const[description,setdescription]=useState("")
    const[publishedDate,setpublishedDate]=useState("")

    

    
    useEffect(()=>{

        axios.get(`/posts/${props.match.params.id}.json`)
            .then(res => {

                setTitle(res.data.title)
                setdescription(res.data.description)
                setpublishedDate(res.data.updatedDate)
               

                console.log("publicpost dayta", res.data)
            })},[props.match.params.id])

    
        let card =
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{publishedDate}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>
                            {ReactHtmlParser(description)}
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />

                    </a>
                </Card.Content>
            </Card>

        return card;
    }



export default PublicPosts;

