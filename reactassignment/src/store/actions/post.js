import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

var moment = require('moment');

export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    };
};

export const orderSuccess = (token, userId) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    };
};


export const post = (title, description, status,userId,token) => {
    return dispatch => {
        dispatch(orderStart());
        const postData = {
            title: title,
            description: description,
            status: status,
            tokenId:userId,
            token:token,
            createdDate:moment().format('LL'),
            updatedDate:moment().format('LL')

        };
        
        let url = "https://cms-react-af25a.firebaseio.com/posts.json";
        
        axios.post(url, postData)
            .then(response => {
                
                console.log(response.data);
            })
            .catch(err => {
                dispatch(orderFail(err.response.data.error));
            });
    };
};




export const fetchPostSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        posts: orders
    };
};

export const fetchPostFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchPostStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchPost = (userId,tokenId) => {
    

    return dispatch => new Promise((resolve, reject) => {
        dispatch(fetchPostStart());
        // alert('?auth=' + tokenId + '&orderBy="tokenId"&equalTo="' + userId+ '');
        const queryParams = '?auth=' + tokenId + '&orderBy="tokenId"&equalTo="'+userId+'"';
        //console.log('===========================/posts.json'+ queryParams);
        
        axios.get( '/posts.json'+ queryParams)
            .then( res => {
                console.log(res);
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchPostSuccess(fetchedOrders));
                resolve(fetchedOrders);
            } )
            .catch( err => {
                reject(err);
                dispatch(fetchPostFail(err));
            } );
    });
};