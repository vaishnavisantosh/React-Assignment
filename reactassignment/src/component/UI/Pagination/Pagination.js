import React from 'react'
import {  Pagination } from 'semantic-ui-react';

const pagination =(props)=>(
<Pagination
        boundaryRange={props.boundaryRange}
        defaultActivePage={props.defaultActivePage || 1}
        siblingRange={props.siblingRange || 1}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
    />
);


export default pagination;