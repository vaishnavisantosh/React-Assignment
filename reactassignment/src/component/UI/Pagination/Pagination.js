import React, { Component } from 'react'
import { Grid, Form, Pagination, Segment } from 'semantic-ui-react';

const pagination =(props)=>(
<Pagination
        boundaryRange={props.boundaryRange}
        defaultActivePage={props.defaultActivePage || 1}
        // ellipsisItem={props.ellipsisItem}
        // firstItem={props.firstItem}
        // lastItem={props.lastItem}
        siblingRange={props.siblingRange || 1}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
    />
);


export default pagination;