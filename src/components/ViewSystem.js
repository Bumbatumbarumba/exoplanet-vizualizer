import React from 'react';
import { NavLink } from 'react-router-dom'
import { Planet } from './Planets'


export const ViewSystem = (props) => {
    return(
        <div className="viewSys">
            <NavLink to="/"><button onClick={props.handleReturn}>Back home</button></NavLink>
            <ul>
                {props.systemInfo.map(item => (
                <li key={item.pl_name}>
                    <Planet planetdata={item}></Planet>
                </li>
                ))}
            </ul>
        </div>
    )
}