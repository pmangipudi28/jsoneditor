import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Editor from '../components/Editor'
import { CircularProgress } from "@material-ui/core";
import { uuid } from "uuidv4";

function Home() {

    const [fileJSON, setFileJSON] = useState([]);     
    const [json, setJson] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [length, setLength] = React.useState(0);

    useEffect(() => {
           
            setLoading(true); 
            try {
                console.log("Ganesha.....");
                setJson(eval(fileJSON));
                setLoading(false);
                setLength(Object.keys(eval(fileJSON)).length);
            }
            catch
            {
                console.log("Shiva.....");
                setLoading(false);
                setJson(eval(JSON.parse(fileJSON)));
                setLength(Object.keys(eval(JSON.parse(fileJSON)).length));
            }
    }, [fileJSON]);

    useEffect(() => {
        console.log(json);
    })

    return (
        <div>
            <Header setFileJSON={setFileJSON} />
            <Editor data={json} length={length} loading={loading} />            
        </div>
    )
}

export default Home
