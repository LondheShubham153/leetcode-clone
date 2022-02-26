import leetcode from './leetcode.png'
import './problems.css'
import working from './working.png'
import checked from './checked.png'
import frequency from './frequency.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
function Problems() {
    const [orgdata, setOrgdata] = useState([])
    const [data, setData] = useState([])
    const [fullname, setfullname] = useState('')
    const [mobile, setmobile] = useState('')
    const [email, setemail] = useState('')
    const [sorted, setSorted] = useState("")
    const navigate = useNavigate()
    const [showprofile, setshowprofile] = useState("profiledata")

    const profile = () => {
        if (showprofile === "profiledata active")
            setshowprofile("profiledata")
        else {
            setshowprofile("profiledata active")
        }
    }
    const sort = (e) => {
        if (e.target.id !== 'auto') {
            const temp = data
            const tempdata = temp.filter(ele => ele.difficulty.toLowerCase().includes(e.target.id))
            temp.map((ele) => {
                if (!ele.difficulty.toLowerCase().includes(e.target.id)) {
                    tempdata.push(ele)
                }
            })
            setData(tempdata)
            setSorted(e.target.id)
        }else{
            setData(orgdata)
            setSorted('')
        }
    }
    const logout = () => {
        axios.get('http://127.0.0.1:8000/user/logout').then(res => {
            if (!res.data.islogin) {
                navigate('/')
            }
        })
    }
    const handlesearch = (e) => {
        setData(
            orgdata.filter(ele => ele.title.toLowerCase().includes(e.target.value))
        )
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('http://127.0.0.1:8000/user/problemset').then(res => {
            if (!res.data.islogin) {
                navigate('/')
            }
            setData(res.data.data)
            setOrgdata(res.data.data)
            setfullname(res.data.firstname + ' ' + res.data.lastname)
            setmobile(res.data.mobile)
            setemail(res.data.email)
        })
    }, [])
    return (
        <>

            <nav>
                <div className="logo">
                    <img src={leetcode} alt="logo" /> LeetCode
                </div>
                <div className="profilecontainer" id="profile">
                    <span>{fullname}</span>
                    <div className="profile" onClick={profile} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#000000b9' d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
                    </div>
                </div>
                <div className={showprofile} id="profiledata" >
                    <div className="username">{fullname}</div>
                    <div className="email">{email}</div>
                    <div className="mobile">{mobile} </div>
                    <div className="action">
                        <span  className="update"><span>Update</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00AF9B" d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" /></svg></span>
                        <span onClick={logout} className="logout"><span>Logout</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00AF9B" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" /></svg></span>
                    </div>

                </div>
            </nav>

            <div className="problems">
                <div className="search">
                    <input type="text" name="search" onChange={handlesearch} placeholder="search in title" id="search" />
                    {/* <button id="searchbtn">Search</button> */}

                    {/* <button id="rmsearchbtn">Cancel Search</button> */}

                    <div className="sort">
                        <div className="sortdiff">
                            <span onClick={sort} id="auto" >auto</span>
                            <span onClick={sort} id="easy" style={{ color: "#00AF9B" }} value="easy">Easy</span>
                            <span onClick={sort} id="medium" style={{ color: "#FFB800" }} value="medium">Medium</span>
                            <span onClick={sort} id="hard" style={{ color: "#FF2D55" }} value="hard">Hard</span>
                        </div>

                        {
                            sorted ? <span>Sorted by {sorted}</span> : <span>Sort by Difficulty</span>
                        }



                    </div>
                    {/* <div className="mydata">
                <div className="cate">
                    <div onclick="{window.location.href = '/problems'}">All</div>
                    <div  onclick="{window.location.href = '/personal'}">Personal</div>
                </div>
                
                Personal
                All
            </div> */}

                </div>


                <table>
                    <tbody>                    <tr>
                        <th>S/R</th>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Solution</th>
                        <th>Difficulty</th>
                        <th>Frequency</th>
                    </tr>
                    {
                        data.map((item, i) => (
                            <tr key={item.id} onClick={()=>navigate(`/solve/${item.id}`)}>
                                <td>{i + 1}</td>
                                {item.status === 'todo' ? <td style={{ color: "#555" }}>--</td> : item.status === 'working' ? <td> <img src={working} alt="" /> </td> : <td> <img src={checked} alt="" /></td>}
                                <td>{item.title}</td>
                                {item.solution ? <td style={{ color: "#00AF9B" }}>Available</td> : <td style={{ color: "#FF2D55" }}>Not Available</td>}
                                {item.difficulty === "easy" ? <td style={{ color: "#00AF9B" }}>Easy</td> : item.difficulty === "medium" ? <td style={{ color: "#FFB800", textShadow: "1px 1px 0px rgba(0, 0, 0, 0.412)" }}>Medium</td> : <td style={{ color: "#FF2D55" }}>Hard</td>}
                                <td><img src={frequency} /></td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>

            </div>

        </>
    )
}

export default Problems