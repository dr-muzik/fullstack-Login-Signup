import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Setup from './Setup'



const Quiz:React.FC = () => {
    const [setup, setSetup] = useState(false)

   

    const handleSetup = () => {
        setSetup(true);
    }

  return (
    <section id='Quiz'>
        <ul>
            <li onClick={handleSetup}><h3>Solo Quiz</h3></li><br />
            <li><h3>Multi-user Quiz</h3></li>
        </ul>
        
        <div className={!setup ? "hide" : "show-setup"}>
            <Setup />
        </div>
    </section>

  )
}

export default Quiz