import React, { useState } from 'react';
import { SystemForm } from './SystemForm'


const handleVisitSystem = (e) => {
    e.preventDefault()
    console.log("do thing")
}


export const MainRouter = () => {
    // Hook definitions
    const [targetSystem, setTargetSystem] = useState("")
    const [toggleStarSearchText, setTextVisible] = useState(false)
    const [apiColumnsToTarget, setColumns] = useState([])

    return (
        <div>
            <h1>Exoplanet Visualizer</h1>
            <h2>{targetSystem}</h2>
            <SystemForm 
                className="systemForm"
                handleVisitSystem={handleVisitSystem} 
                enableText={toggleStarSearchText} 
                handleOnChange={e => setTargetSystem(e.target.value)} 
                handleToggleStarSearchText={e => setTextVisible(!toggleStarSearchText)}/>
        </div>
    )
}