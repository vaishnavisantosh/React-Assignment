import React from 'react';
import AuthVSPost from '../Charts/autherVsNumberOfPosts';
import PublishVsunpublish from '../Charts/publishedVsUnpublished';


const charts=(props)=>(
    <>
   
    <PublishVsunpublish/>
    <AuthVSPost/>
         
    </>
);


export default charts;