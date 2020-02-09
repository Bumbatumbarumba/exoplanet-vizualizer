import React, { useState, useEffect } from 'react';
import { SystemForm } from './SystemForm'
import { GetListOfSystems, GetTargetSystemData } from '../helpers/nasaApiHelper'


export const MainRouter = () => {
    // Hook definitions
    const [targetSystem, setTargetSystem] = useState("") // Updates as user types.
    const [enterSystem, setEnterSystem] = useState("") // Set when user clicks "view system".
    const [toggleStarSearchText, setTextVisible] = useState(false) // Togggles the search bar.
    const [systemData, setSystemData] = useState([]) // Populates with data on an existing system.
    const [systemList, setSystemList] = useState([]) // List of stars with planets around them.
    const [systemExists, setSystemExists] = useState(false) // Self-explanatory lol.
    const [disableViewSystem, setDisableViewSystem] = useState(false)

    //
    // Toggles the "view system" button depending on the state of systemList.
    //
    useEffect(() =>{
        setDisableViewSystem(systemList === [])

        // NOTE TO SELF: FIGURE OUT WHY THIS ISN'T WORKING (gosh darn react)
        
    }, [systemList])


    //
    // Gets a list of systems. 
    //
    useEffect(() => {
        const getData = async () => {
            var response = await GetListOfSystems()
            setSystemList(response)
        }
        getData()
    }, [])


    //
    // Checks if the selected system exists in the list of systems.
    //
    useEffect(() => {
        if (enterSystem !== ""){
            for (var i = 0; i < systemList.length; i++){
                if (systemList[i].pl_hostname === enterSystem){
                    setSystemExists(true)
                    break;
                }
                else {
                    setSystemExists(false)
                }
            }
        }
    }, [enterSystem, systemList])


    //
    // Queries the api for an existing system's data.
    //
    useEffect(() => {
        const getData = async () => {
            if (systemExists){
                var response = await GetTargetSystemData("'" + enterSystem+ "'")
                setSystemData(response)
            }
        }
        getData()
    }, [enterSystem, systemExists])


    //
    //
    //
    const handleSubmit = (e) => {
        e.preventDefault()
        viewSystem(targetSystem)
    }


    //
    //
    //
    const viewSystem = (sysname) => {
        setEnterSystem(sysname)
    }


    return (
        <div>
            <h1>Exoplanet Visualizer</h1>
            <h2>{targetSystem}</h2>
            <label><input type="checkbox" onClick={e => setTextVisible(!toggleStarSearchText)}></input>View random system</label>
            <SystemForm 
                className="systemForm"
                enableText={toggleStarSearchText} 
                handleOnChange={e => setTargetSystem(e.target.value)} 
                handleSubmit={handleSubmit}
                toggleSubmit={disableViewSystem}/>
                <ul>
            {systemData.map(item => (
                <li key={item.pl_name}>
                <h4>{item.pl_hostname}</h4>
                </li>
            ))}
            </ul>
        </div>
    )
}