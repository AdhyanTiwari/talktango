import React, { useEffect, useState } from 'react'
import image from "./images/chat.png"
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [warning, setWarning] = useState("")
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const signIn = async (user) => {
        try {
            setLoading(true);
            let data = user;
            const response = await fetch("https://talktangobackend1.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await response.json();
            console.log(json)
            setStatus(json.status);

            if (json.status) {
                localStorage.setItem("token", json.token);
                localStorage.setItem("myUser", json._id)
                setLoading(false);
                navigate("/app/welcome");
            }
            else {
                setWarning(json.error)
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            setLoading(false);
            navigate("/");
        }
    }

    const signin = (e) => {
        e.preventDefault();
        signIn(data);
    }
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="login-sidebar">
                <div className='login-img'>
                    <img src={image} alt="" />
                </div>
            </div>
            <form className="login-main" onSubmit={signin}>
                {status ? <></> : <Alert severity="error">{warning}</Alert>}

                <div id='login-text'>Login to your Account</div>
                <div className='login-input'>
                    <input type="text" placeholder='Enter User email' name='email' value={data.email} onChange={onChange} />
                </div>
                <div className='login-input'>
                    <input type="password" placeholder='Enter User Password' name='password' value={data.password} onChange={onChange} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div className='login-link'>
                    New user? <Link to={"/signup"}>SignUp!</Link>
                </div>
            </form>
        </>
    )
}

export default Login