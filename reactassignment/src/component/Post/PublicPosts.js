import React ,{Component} from 'react';
import axios from '../../axios-orders';


class PublicPosts extends Component{

    state={
        title:'',
        description:''
    }
    componentDidMount(){

        axios.get(`/posts/${this.props.match.params.id}.json`)
        .then(res=>{console.log("publicpost dayta",res.data)});
    }

    render(){
        return(<></>);
    }
}


export default PublicPosts;

