import * as React from 'react';
import {StyledEngineProvider} from '@mui/material/styles';
import './App.css';
import FormInput from '../FormInput/FormInput';
import useToken from './useToken';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from "./CustomTabPanel";
import Dashboard from "../Dashboard/Dashboard";

function App() {

    const {token, setToken} = useToken();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    /*if (!token) {
        return <Login setToken={setToken}/>
    }*/

    return (
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <div className="wrapper">
                    <h1>Sales Report</h1>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Dashboard" {...a11yProps(0)} />
                                <Tab label="Upload" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <React.Fragment><Dashboard/></React.Fragment>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <React.Fragment><FormInput/></React.Fragment>
                        </CustomTabPanel>
                    </Box>
                </div>
            </StyledEngineProvider>
        </React.StrictMode>
    );
}

export default App;