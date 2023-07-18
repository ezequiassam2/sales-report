import React, {useEffect, useState} from 'react';
import CollapsibleTable from "./CollapsibleTable";
import {Alert, AlertTitle, Backdrop, CircularProgress, Collapse, IconButton, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(true)
    const [isError, setIsError] = useState(false)

    const handleCloseProgress = () => {
        setProgress(false);
    };

    useEffect(() => {
        function loadingProducts() {
            try {
                setIsError(false)
                fetch('http://localhost:8000/api/v1/products', {
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
                    .catch(err => {
                        setLoading(false)
                        setProgress(false)
                        setIsError(true)
                    })
            } catch (e) {
                setLoading(false)
                setProgress(false)
                setIsError(true)
            }
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
                <Stack sx={{width: '100%'}} spacing={5} align={'left'}>
                    <Collapse in={isError}>
                        <Alert severity="error"
                               action={
                                   <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {
                                           setIsError(false);
                                       }}
                                   >
                                       <CloseIcon fontSize="inherit"/>
                                   </IconButton>
                               }
                               sx={{mb: 2}}>
                            <AlertTitle>Error</AlertTitle>
                            Unable to retrieve product list
                        </Alert>
                    </Collapse>
                </Stack>
                <h3>Dashboard Products</h3>
                <CollapsibleTable data={data}/>
            </div>
        </React.Fragment>
    );
}