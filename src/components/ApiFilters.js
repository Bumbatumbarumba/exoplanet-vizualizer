import React, { useState } from 'react';
import '../css/apifilters.css'


const apiColumns = [["pl_hostname","Host Star Name"],
  ["pl_letter","Planet Letter"],
  ["pl_name", "Planet Name"],
  ["pl_pnum", "Planets in Sys"],
  ["pl_orbper", "Orbital Period"],
  ["pl_orbsmax", "Semi-Major Axis"],
  ["pl_orbeccen", "Eccentricity"],
  ["pl_masse", "Planet Mass"],
  ["pl_rade", "Planet Radius"],
  ["st_mass", "Stellar Mass"],
  ["st_rad", "Stellar Radius"],
  ["st_logg", "S. Surface Gravity"],
  ["st_dens", "Stellar Density"],
  ["st_age", "Stellar Age"],
  ["st_vsini", "S. Rotational Vel"]]


export const ApiFilters = (props) => {
    return (
        <div className="filtersList">
            <ul>
                {apiColumns.map(item =>
                    <ToggleableButton key={item} value={item}></ToggleableButton>
                )}
            </ul>
        </div>
    )
}

const ToggleableButton = (props) => {
    const [isEnabled, setToggle] = useState(true)

    return (
        <input type="button" 
            value={props.value[1]} 
            onClick={e => setToggle(!isEnabled)} 
            className={"filterbutton " + isEnabled}></input>
    )
}