import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

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


export const post = (title, description, status,userId) => {
    return dispatch => {
        dispatch(orderStart());
        const postData = {
            title: title,
            description: description,
            status: status,
            userId:userId,
            createdDate:new Date().getTime() / 1000,
            updatedDate:new Date().getTime() / 1000

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
        orders: orders
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

export const fetchPost = (token,userId) => {
    

    return dispatch => {
        dispatch(fetchPostStart());
        const queryParams = '?auth=' + token + '&orderBy="tokenId"&equalTo="' + userId+ '';
        axios.get( '/posts.json'+ queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchPostSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchPostFail(err));
            } );
    };
};