import React from 'react';
import { NavLink } from 'react-router-dom'

export const ViewSystem = (props) => {
    return(
        <div className="viewSys">
            <NavLink to="/"><button>Back home</button></NavLink>
            {/* <ul>
                {props.systemInfo.map(item => (
                <li key={item.pl_name}>
                    {item.pl_hostname}
                </li>
                ))}
            </ul> */}
        </div>
    )
}