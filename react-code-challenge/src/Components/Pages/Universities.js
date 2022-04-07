import React, { useEffect, useState } from 'react';
import './Universities.css';

const URL_UNI_INFO = "http://universities.hipolabs.com/";
const URL_COUNTRIES_INFO = "https://countriesnow.space/api/v0.1/countries/info?returns=none"


function Dropdown(props) {
    const options = props.options;
    
    function handleSelection(e) {
        props.assignSelection(e.target.innerHTML);
    }
    const mappedOptions = options.map((ele, index)=>{
        return <button onClick={handleSelection} className='dropdown-elements' key={index}>{ele.name}</button>
    });

    return(
        <div>
            
        <ul className='dropdown'>
        <strong className='country'>Countries List</strong>
            {mappedOptions}
        </ul>

        </div>
    )
}

function UniList(props) {
    
    const mappedUnis = props.options.map((ele, index)=>{
        return <li className='uni-element' key={index}>{ele.name}</li>
    })

    return(
            <div className='uni-list'>
                {mappedUnis}
            </div>
        )
}

export default function Universities() {

    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(true);
    const [selection, setSelection] = useState('Canada');

    function assignSelection(s) {
        setSelection(s);
    }

    function update() {
        fetch(URL_UNI_INFO + 'search?country=' + selection).then(response=>response.json())
        .then((json)=>setUniversities(json));
    }

    useEffect(()=> {
        fetch(URL_COUNTRIES_INFO).then(response=>response.json())
        .then((json)=>json["data"])
        .then(res=>{setCountries(res)})
        update();
    },[selection])


    return (
        <div>
            {menuIsOpen && <Dropdown options={countries} assignSelection={assignSelection}/>}
            <center>
            <h2 style={{margin: "10px"}}> Universities in {selection}</h2>
            </center>
            <UniList options={universities} update={update}/>
        </div>
    )
}
