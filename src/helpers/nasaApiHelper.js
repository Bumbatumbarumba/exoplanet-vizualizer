import axios from 'axios'


const BASE_API = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?"
const CONFIRMED_PLANETS_TABLE = "table=exoplanets&select="
const SELECTORS = "pl_hostname,pl_pnum,pl_name,pl_letter,pl_orbper,pl_orbsmax,pl_orbeccen,pl_masse,pl_rade,st_mass,st_rad,st_logg,st_dens,st_age,st_vsini"
const ORDER_BY = "&order=dec"
const STAR_FILTER = "&where=pl_hostname like "
const FORMAT = "&format=json"


//
// Gets a list of all confirmed system host names.
//
export const GetListOfSystems = async () => {
    var response = await axios(BASE_API + CONFIRMED_PLANETS_TABLE + "pl_hostname" + ORDER_BY + FORMAT)
    return response.data
} 

//
// Query api for data on target system.
//
export const GetTargetSystemData = async (targetSystem) =>{
    const response = await axios(BASE_API + CONFIRMED_PLANETS_TABLE + SELECTORS + ORDER_BY + STAR_FILTER + targetSystem + FORMAT)
    return response.data
}