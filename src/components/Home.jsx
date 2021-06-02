import React from 'react'
import {useSelector} from 'react-redux';

import Header from '../components/Header'
import Editor from '../components/Editor'

function Home() {
    


    return (
        <div>
            <Header />
            <Editor />            
        </div>
    )
}

export default Home
