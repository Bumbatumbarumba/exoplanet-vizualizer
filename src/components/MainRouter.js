import React, { useState, useEffect } from 'react';
import { SystemForm } from './SystemForm'
import { GetListOfSystems, GetTargetSystemData } from '../helpers/nasaApiHelper'
import axios from 'axios'


const handleVisitSystem = (e) => {
    e.preventDefault()
}


export const MainRouter = () => {
    // Hook definitions
    const [targetSystem, setTargetSystem] = useState("")
    const [toggleStarSearchText, setTextVisible] = useState(false)
    const [temp, setTemp] = useState([])

    useEffect(() => {
        const getData = async () => {
            const result = await axios(
                "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_pnum,pl_name,pl_letter,pl_orbper,pl_orbsmax,pl_orbeccen,pl_masse,pl_rade,st_mass,st_rad,st_logg,st_dens,st_age,st_vsini&where=pl_hostname%20like%20%27KOI-351%27&format=json",
                )//GetTargetSystemData("'KOI-351'")
            setTemp(result.data)
        }

        getData()
    }, [])

    return (
        <div>
            <h1>Exoplanet Visualizer</h1>
            <SystemForm 
                className="systemForm"
                handleVisitSystem={handleVisitSystem} 
                enableText={toggleStarSearchText} 
                handleOnChange={e => setTargetSystem(e.target.value)} 
                handleToggleStarSearchText={e => setTextVisible(!toggleStarSearchText)}/>
                <ul>
            {temp.map(item => (
                <li key={item.pl_name}>
                <h4>{item.pl_hostname}</h4>
                </li>
            ))}
            </ul>
        </div>
    )
}