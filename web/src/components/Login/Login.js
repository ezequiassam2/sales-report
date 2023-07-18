import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {Box, Button, TextField} from "@mui/material";

async function loginUser(credentials) {
    return fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required
                            id="name"
                            label="Username"
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="pass"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <br/>
                    <div align={'center'}>
                        <Button variant="contained" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </Box>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}