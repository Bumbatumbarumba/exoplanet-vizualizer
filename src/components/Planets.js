import React from 'react';


export const Planet = (props) => {
    return(
        <div className={props.planetdata.pl_name}>
            <h1>this is planet {props.planetdata.pl_name}</h1>
        </div>
    )
}