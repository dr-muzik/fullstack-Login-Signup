import React from 'react'
import { useNavigate } from 'react-router-dom'

// type Props = {}

const Unauthorized:React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

  return (
    <section>
        
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div>
            <button onClick={goBack}>Go back</button>
        </div>
        
    </section>
  )
}

export default Unauthorized