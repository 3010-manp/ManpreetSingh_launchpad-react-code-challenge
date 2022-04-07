import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './PostalLookup.css'

const URL = "https://api.zippopotam.us/us/";

export function ADetails(props) {
    
    const areaDetails = props.area
    let places = [];
    if(areaDetails["places"] != null) {
        places = areaDetails["places"].map(ele=>
        <div>
            <div className='area-name'>{ele["place name"]}, {ele["state abbreviation"]}</div>
            <div>Longitude: {ele["longitude"]}</div>
            <div> Latitude: {ele["latitude"]}</div>
            <div>State: {ele["state"]}</div>   
        </div>)}

    return(
        <div className='area'>
            <h2>Location(s)</h2>
            <div className='area-country'>
                <div className='area-abbr'>{areaDetails["country abbreviation"]}</div>
                <div>({areaDetails['country']})</div>
            </div>
            
            <div className='area-place'>{places}</div>
        </div>
    )
    
}

export default function PostalLookup() {
    const [input, setInput] = useState('');
    const [area, setArea] = useState({});

    function processResult(res) {
        setArea(res);
    }

    function processError(code) {
        setArea({
            "post code": "",
            "country": "Place is Not Found or Invalid Postal Code",
            "country abbreviation": "",
            "places": [],
        })
    }


    useEffect(() => {
        if(input == '' || input == null) {
            setInput("{code}");
        }

        axios.get(URL + input)
        .then(res=>processResult(res.data))
        .catch(err=>processError(err.response.status))
    }, [input])
    
    return (
        <div>
            <h1 style={{position:"absolute", left:"40%", top:"20%", }}>Postal Code  Search</h1>
            <input onChange={e=>setInput(e.target.value)} className='postal-search' placeholder='Enter a postal code of US Location...'></input>
            <ADetails area={area} />
        </div>
    )
}
