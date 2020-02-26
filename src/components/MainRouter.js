import React, { useState, useEffect } from 'react';
import { SystemForm } from './SystemForm'
import { ViewSystem } from './ViewSystem'
import { GetListOfSystems, GetTargetSystemData } from '../helpers/nasaApiHelper'
import { Route, BrowserRouter } from 'react-router-dom'
import {} from 'react-router'
import '../css/main.css'


export const MainRouter = (props) => {
    // Hook definitions
    const [targetSystem, setTargetSystem] = useState("") // Updates as user types.
    const [enterSystem, setEnterSystem] = useState("") // Set when user clicks "view system".
    const [toggleStarSearchText, setTextVisible] = useState(false) // Togggles the search bar.
    const [systemData, setSystemData] = useState([]) // Populates with data on an existing system.
    const [systemList, setSystemList] = useState([]) // List of stars with planets around them.
    const [systemExists, setSystemExists] = useState(false) // Stores whether a searched system exists.
    const [toggleViewSys, setToggleViewSys] = useState(true) // Toggles the view system button.
    const [toggleSysForm, setToggleSysForm] = useState("systemForm-visible") // Toggles the system form.
    const [isRandomOn, setIsRandomOn] = useState(false) // Stores if the view random system option is checked.

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
        setToggleViewSys(systemList === [] && ((targetSystem !== "") || isRandomOn))
    }, [systemList, targetSystem, isRandomOn])


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
    // Handles the user checkmarking to view the random system.
    //
    const handleViewRandom = () => {
        setTextVisible(!toggleStarSearchText)
        setIsRandomOn(!isRandomOn)
    }


    //
    // Handles the user returning to the main page to view the form.
    //
    const handleReturn = () => {
        setToggleSysForm("systemForm-visible")
        console.log(toggleSysForm)
    }


    //
    // Handler for when the user clicks the view system button.
    //
    const handleSubmit = (e) => {
        //e.preventDefault()
        var result = targetSystem
        
        if(toggleStarSearchText){
            result = pickRandomSystem()
            setTargetSystem(result)
        }
        setEnterSystem(result)
        viewSystem(result)
        setToggleSysForm("systemForm-hidden")
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
            <BrowserRouter>
                <h1>Exoplanet Visualizer</h1>
                <div className={toggleSysForm}>
                    <SystemForm 
                        enableText={toggleStarSearchText} 
                        handleOnChange={e => setTargetSystem(e.target.value)} 
                        handleToggleSearch={handleViewRandom}
                        handleSubmit={handleSubmit}
                        toggleSubmit={toggleViewSys}
                        systemList={systemList}/>
                </div>
                <Route path="/viewsys" exact component={() => <ViewSystem systemInfo={systemData} handleReturn={handleReturn}></ViewSystem>}></Route>
            </BrowserRouter>
        </div>
    )
}