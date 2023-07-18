import React, {useEffect, useState} from 'react';
import CollapsibleTable from "./CollapsibleTable";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(true)

    const handleCloseProgress = () => {
        setProgress(false);
    };

    useEffect(() => {
        function loadingProducts() {
            return fetch('http://localhost:8000/api/v1/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(credentials)
            })
                .then(resp => resp.json())
                .then(jsonData => {
                    setData(jsonData)
                    setLoading(false)
                    setProgress(false)
                })
        }

        if (loading) {
            loadingProducts()
        }
    })

    return (
        <React.Fragment>
            <div data-testid="page-dash">
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={progress}
                    onClick={handleCloseProgress}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <h3>Dashboard Products</h3>
                <CollapsibleTable data={data}/>
            </div>
        </React.Fragment>
    );
}