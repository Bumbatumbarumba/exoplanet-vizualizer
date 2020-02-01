// TABLE COLUMNS:
// pl_name
// pl_letter
// pl_orbper
// pl_orbsmax
// pl_orbeccen
// pl_masse
// pl_rade
// st_mass
// st_rad
// st_logg
// st_dens
// st_age
// st_vsini

const BASE_API = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?"
const CONFIRMED_PLANETS_TABLE = "table=exoplanets&select="
const BASE_SELECTORS = "pl_hostname,pl_pnum"
const STAR_FILTER = "&where=pl_hostname= like "
const ORDER_BY = "&order=dec"
const FORMAT = "&format=json"


export const BuildApiQuery = listOfColumns => {
    var columnSelector = BASE_SELECTORS

    listOfColumns.forEach(element => {
        element = "," + element
        columnSelector += element
    });

    columnSelector = columnSelector.replace(columnSelector.charAt(0), "")
    return columnSelector
}


export const GetListOfSystems = () => {
    fetch(BASE_API + CONFIRMED_PLANETS_TABLE + "pl_hostname" + ORDER_BY + FORMAT)
    .then((response) => {
        return response.json()
    })
} 


export const SearchResultsByStar = (result, hostname) => {
    var searchResult = []

    result.forEach(system => {
        if (system.pl_hostname === hostname){
            searchResult.push(system)
        }
    });

    return searchResult
}