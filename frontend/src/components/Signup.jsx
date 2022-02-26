import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userexist,setUserexist] = useState(false)
  const [inputs, setInputs] = useState({
    username:"",
    firstname:"",
    lastname:"",
    mobile:"",
    email:"",
    password:"",
  })
    const navigate = useNavigate()
    const handleInputs = (e)=>{
      setInputs({...inputs,[e.target.name]:e.target.value})
    }
    const register = (e)=>{
      e.preventDefault()
      axios.post('http://127.0.0.1:8000/user/signup',inputs).then(res=>{
        console.log(res.data)
      if (res.data.userexist){
        setUserexist(res.data.userexist)
        // setInputs({})
      }  
      if(res.data.isregister){
          navigate('/')
      }
      })
    }
    useEffect(()=>{
      axios.post('http://127.0.0.1:8000/user/signup',{}).then(res=>{
        if(res.data.islogin){
          navigate('/problems')
      }
      
      })
      
    },[])
    useEffect(()=>{
      console.log(inputs)
    },[inputs])
  return (
    <>
    
    <form onSubmit={register}  method="post">
        <div className="heading">leetCode</div>
        <div>
            <div className="input">
                <label htmlFor="username">Create Username</label>
                <input required type="text" pattern="[a-z]{4,8}" title="4 to 8 lowercase letters" value={inputs.username} onChange={handleInputs} placeholder="Create your username" name="username" id="username" />
                {userexist ? <div style={{ fontSize: "12px", padding: "10px 2px", color: "rgb(221, 22, 22)" }}>Username Already Exist</div> : ""}
                
            </div>
            <div className="input">
                <label htmlFor="fullname">First Name</label>
                <input required type="text" value={inputs.firstname} onChange={handleInputs} placeholder="Enter  First Name" name="firstname" id="firstname" />
            </div>
            <div className="input">
                <label htmlFor="fullname">Last Name</label>
                <input required type="text" value={inputs.lastname} onChange={handleInputs} placeholder="Enter  Last Name" name="lastname" id="lastname" />
            </div>
            <div className="input">
                <label htmlFor="mobile">mobile</label>
                <input required type="tel" value={inputs.mobile} onChange={handleInputs} placeholder="Enter  mobile number" name="mobile" id="mobile" />
            </div>

            <div className="input">
                <label htmlFor="email">Email</label>
                <input required type="email" value={inputs.email} onChange={handleInputs} placeholder="Enter  email" name="email" id="email" />
            </div>
            <div className="input">
                <label htmlFor="confpassword">New Password</label>
                <input required type="password" minLength={6} value={inputs.password} onChange={handleInputs} placeholder="Create  password" name="password" id="confpassword" />
            </div>
        </div>
        <div className="processed">
            <div className="anyac" onClick={()=>{navigate('/')}}>I already have an account</div>
            <button>Register</button>
            {/* <button>Update Profile</button> */}
        </div>
    </form>
    </>
  )
}

export default Signup