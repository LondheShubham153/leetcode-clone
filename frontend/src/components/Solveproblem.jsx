import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Solveproblem() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [problemdata,setProblemdata] = useState({})

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/user/getoneproblem/${id}`).then(res => {
            if (!res.data.islogin) {
                navigate('/')
            }
            setProblemdata(res.data.data)
            console.log(res.data.data)
        })
    },[])
  return (
    <div className='solvingcont'>
    
        <div className="aboutproblem">
            
        </div>
        <div className="solveproblem">

        </div>

    </div>
  )
}

export default Solveproblem