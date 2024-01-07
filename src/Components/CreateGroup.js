import React, { useState } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';



function CreateGroup() {
    const LightTheme = useSelector((state) => state.themeKey);

    const [data, setData] = useState({ groupName: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [greenStatus, setGreenStatus] = useState(false)
    const [warning, setWarning] = useState("")
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const createGroup = async (groupName) => {
        try {
            setLoading(true);
            let data = groupName;
            const response = await fetch("https://talktangobackend1.onrender.com/chat/createGroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(data)
            })
            const json = await response.json();
            setStatus(json.status);

            if (json.status) {
                setWarning("Successfully created!")
                setLoading(false);
                setGreenStatus(true);
                setTimeout(() => {
                    setGreenStatus(false);
                }, 5000)
            }
            else {
                setWarning(json.error)
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            navigate("/");
        }
    }

    const creategroup = (e) => {
        e.preventDefault();
        createGroup(data);
    }


    return (
        <AnimatePresence>
            <motion.div className='cg-container'
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 0 }}
                transition={{ ease: "anticipate", duration: 0.25 }}>
                <div style={{ margin: "2rem" }}>
                    {status ? <></> : <Alert severity="error">{warning}</Alert>}
                    {greenStatus ? <Alert severity="success">{warning}</Alert> : <></>}
                </div>
                <form className={"cg-inputarea" + ((LightTheme) ? "" : " dark")} onSubmit={creategroup}>
                    <input type="text" placeholder='Enter group name' name='groupName' value={data.groupName} onChange={onChange} />
                    <div>
                        <IconButton type='submit'>
                            <GroupAddIcon className={(LightTheme) ? "" : " dark"} />
                        </IconButton>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}

export default CreateGroup