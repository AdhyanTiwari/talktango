import React, { useState } from 'react'
import image from "./images/chat.png"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [warning, setWarning] = useState("");

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const signUp = async (user) => {
        try {
            setLoading(true);
            let data = user;
            const response = await fetch("https://talktangobackend1.onrender.com/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await response.json();
            setStatus(json.status);
            if (json.status) {
                localStorage.setItem("token", json.token);
                setLoading(false);
                navigate("/app/welcome");
            }
            else {
                setWarning(json.error)
                setLoading(false);
                navigate("/signup");
            }
        } catch (error) {
            setLoading(false);
            navigate("/signup");
        }
    }

    const signup = (e) => {
        e.preventDefault();
        signUp(data);
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
            <form className="login-main" onSubmit={signup}>
                {status ? <></> : <Alert severity="error">{warning}</Alert>}
                <div id='login-text'>Create Your TalkTango Account</div>
                <div className='login-input'>
                    <input type="text" placeholder='Enter User Name' name='name' value={data.name} onChange={onChange} />
                </div>
                <div className='login-input'>
                    <input type="text" placeholder='Enter User Email' name='email' value={data.email} onChange={onChange} />
                </div>
                <div className='login-input'>
                    <input type="password" placeholder='Enter User Password' name='password' value={data.password} onChange={onChange} />
                </div>
                <div>
                    <button type='submit'>Signup</button>
                </div>
                <div className='login-link'>
                    Already a user? <Link to={"/"}>SignIn</Link>
                </div>

            </form>
        </>
    )
}

export default Signup