import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Planet } from './Planets'


export const ViewSystem = (props) => {
    const [selectedPlanet, setSelectedPlanet] = useState({}) 

    const handlePlanetClick = (item) => {
        setSelectedPlanet(item)
        console.log("test")
    }

    return(
        <div className="viewSys">
            <NavLink to="/"><button onClick={props.handleReturn}>Back home</button></NavLink>
            <ul>
                {props.systemInfo.map(item => (
                <li key={item.pl_name}>
                    <Planet planetdata={item} handlePlanetClick={() => handlePlanetClick(item)}></Planet>
                </li>
                ))}
            </ul>

            <ShowPlanetInfo planet={selectedPlanet}></ShowPlanetInfo>
        </div>
    )
}

export const ShowPlanetInfo = (props) => {
    return(
        <div className="show-planet-info">
            <h3>Viewing data on planet {props.planet.pl_name}</h3>
            <p>
                Orbital period: {props.planet.pl_orbper}<br/>
                Planet mass (in Earth masses): {props.planet.pl_masse}<br/>                
                Planet radius (in Earth radius): {props.planet.pl_rade}<br/>
                Stellar radius: {props.planet.st_rad}<br/>
                Stellar age (in billions of years): {props.planet.st_age}<br/>
            </p>
        </div>
    )
}