import React from 'react';
import { ApiFilters } from './ApiFilters'

const defaultText = "Enter target system"

const handleOnFocus = (e) => {
    if (e.target.value === defaultText){
        e.target.value = ""
    }
}

const handleOnBlur = (e) => {
    if (e.target.value === ""){
        e.target.value = defaultText
    }
}

export const SystemForm = (props) => {
    return (
        <form onClick={props.handleSubmit}>
            <input type="text" disabled={props.enableText} onChange={props.handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} defaultValue={defaultText}></input>
            <input type="submit" disabled={!props.toggleSubmit} value="View System"></input>
        </form>
    )
}