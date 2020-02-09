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
    const [toggleViewSys, setToggleViewSys] = useState(true) // Toggles the view system button.


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
    // Disables the view system button while data loads.
    //
    useEffect(() => {
        setToggleViewSys(systemList === [])
    }, [systemList])


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
    // Handler for when the user clicks the view system button.
    //
    const handleSubmit = (e) => {
        e.preventDefault()

        if(toggleStarSearchText){
            var result = pickRandomSystem()
            setTargetSystem(result)
        }
        setEnterSystem(targetSystem)
        viewSystem(targetSystem)
    }


    //
    const pickRandomSystem = () => {
        var randomNum = getRandomIntInclusive(0, systemList.length-1)
        return systemList[randomNum].pl_hostname
    }


    // TEMP, PUT THIS ELSEWHERE
    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }


    //
    // Does the stuff to make the cool stuff happen, you feel me dawg?
    //
    const viewSystem = (sysname) => {
        setEnterSystem(sysname)
    }


    //
    // Renders the components.
    //
    return (
        <div>
            <h1>Exoplanet Visualizer</h1>
            <div className="">
                <label><input type="checkbox" onClick={e => setTextVisible(!toggleStarSearchText)}></input>View random system</label>
                <SystemForm 
                    className="systemForm"
                    enableText={toggleStarSearchText} 
                    handleOnChange={e => setTargetSystem(e.target.value)} 
                    handleSubmit={handleSubmit}
                    toggleSubmit={toggleViewSys}
                    systemList={systemList}/>
            </div>
                <ul className="DELETE THIS IT'S ONLY FOR TESTING">
            {systemData.map(item => (
                <li key={item.pl_name}>
                <h4>{item.pl_hostname}</h4>
                </li>
            ))}
            </ul>
        </div>
    )
}