import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
//import { fetchPostStart, fetchPostSuccess, fetchPostFail } from '../actions/post';

const initialState = {
    posts: [],
    loading: false,
    
};



const postStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const postSuccess = ( state, action ) => {
    const newpost = updateObject( action.postData );
    return updateObject( state, {
        loading: false,
        
        posts: state.posts.concat( newpost)
    } );
};

const postFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const fetchPostStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPostSuccess = ( state, action ) => {
    return updateObject( state, {
        posts: action.posts,
        loading: false
    } );
};

const fetchPostFail= ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ORDER_START: return postStart( state, action );
        case actionTypes.ORDER_SUCCESS: return postSuccess( state, action )
        case actionTypes.ORDER_FAIL: return postFail( state, action );
        case actionTypes.FETCH_ORDERS_START: return fetchPostStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchPostSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchPostFail( state, action );
        
        default: return state;
    }
};

export default reducer;