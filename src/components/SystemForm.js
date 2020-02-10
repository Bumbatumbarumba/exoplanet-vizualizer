import React from 'react';
import { NavLink } from 'react-router-dom'
//import SelectSearch from 'react-select-search'


const defaultText = "Enter target system"


//
// Handler for when the user enters the search box.
//
const handleOnFocus = (e) => {
    if (e.target.value === defaultText){
        e.target.value = ""
    }
}

//
// Handler for when the user clicks out of the search box.
//
const handleOnBlur = (e) => {
    if (e.target.value === ""){
        e.target.value = defaultText
    }
}


//
// Renders component.
//
export const SystemForm = (props) => {
    //const options = props.systemList.slice(0,10)

    return (
        <div>
            <label><input type="checkbox" onClick={props.handleToggleSearch}></input>View random system</label>
            <input type="text" disabled={props.enableText} onChange={props.handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} defaultValue={defaultText}></input>
            {/* <SelectSearch options={options} placeholder="test"></SelectSearch> */}
            <NavLink to="/viewsys"><button disabled={props.toggleSubmit} onClick={props.handleSubmit}>View System</button></NavLink>
        </div>
    )
}