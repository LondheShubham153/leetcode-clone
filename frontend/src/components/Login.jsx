import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './style.css'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [pswd, setPswd] = useState('')
    const [inputusername, setInputusername] = useState('')
    const [inputpswd, setInputpswd] = useState('')
    axios.defaults.withCredentials = true;
    const letLogin = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/user/login', { "username": inputusername, "password": inputpswd }).then(res => {
            console.log(res.data)
            setUsername(res.data.username)
            setPswd(res.data.password)
            if (res.data.islogin) {
                navigate('/problems')
            }

        })


    }

    const handleusername = (e) => {
        setInputusername(e.target.value)
    }
    const handlepswd = (e) => {
        setInputpswd(e.target.value)
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.post('http://127.0.0.1:8000/user/login', { "username": inputusername, "password": inputpswd }).then(res => {
            console.log(res.data)
            if (res.data.islogin) {
                navigate('/problems')
            }
        })
    }, [])

    return (
        <form onSubmit={letLogin}>
            <div className="heading">leetCode Administration</div>
            <div>
                <div className="input">
                    <label htmlFor="username">Enter Username</label>
                    <input required type="text"  value={inputusername} onChange={handleusername} placeholder="Enter your username" name="username" id="username" />
                    {/* {% if username == False %} */}
                    {username === false ? <div style={{ fontSize: "12px", padding: "10px 2px", color: "rgb(221, 22, 22)" }}> Please Enter valid username</div> : ""}
                    {/* {% endif %} */}
                </div>
                <div className="input">
                    <label htmlFor="password">Enter Password</label>
                    <input required type="password" value={inputpswd} onChange={handlepswd} placeholder="Enter your password" name="password" id="password" />
                    {/* {% if password == False %} */}
                    {pswd === false ? <div style={{ fontSize: "12px", padding: "10px 2px", color: "rgb(221, 22, 22)" }}> Please Enter valid password</div> : ""}
                    {/* {% endif %} */}
                </div>
            </div>
            <div className="processed">
                <div className="anyac" onClick={()=>navigate('/signup')}>I don't have account</div>
                <button >LogIn</button>
            </div>
        </form>
    )
}

export default Login