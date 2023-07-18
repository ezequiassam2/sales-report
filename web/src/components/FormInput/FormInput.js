import React, {useState} from 'react';
import {
    Alert,
    AlertTitle,
    Backdrop,
    Button, CircularProgress,
    Collapse,
    Container,
    CssBaseline,
    IconButton,
    Input,
    Stack
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function FormInput() {
    const [file, setFile] = useState({});
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(false)
    const [message, setMessage] = useState({title: '', body: '', severity: 'error'})

    const handleCloseProgress = () => {
        setProgress(false);
    };
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }
        setProgress(true);
        let formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8000/api/v1/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': ``,
            },
        })
            .then((res) => res)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                setMessage({title: 'Success', body: 'Upload completed', severity: 'success'});
                setProgress(false)
            })
            .catch(async error => {
                let err_msg = JSON.stringify(error)
                try {
                    await error.json().then(jsonError => {
                        err_msg = jsonError
                        if (jsonError.detail && typeof jsonError.detail === 'object') {
                            if (!jsonError.detail.file) {
                                err_msg = jsonError.detail
                            } else {
                                err_msg = jsonError.detail.file[0]
                            }
                        }
                    }).catch(genericError => {
                        err_msg = error.statusText
                    });
                } catch (err) {
                }
                setMessage({title: 'Error', body: `${err_msg.detail || err_msg}`, severity: 'error'})
                setProgress(false)
            });
        setOpen(true)
    }

    return (
        <React.Fragment>
            <div data-testid="page-up">
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={progress}
                    onClick={handleCloseProgress}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <CssBaseline/>
                <Container maxWidth="sm" align={'center'}>
                    <Stack sx={{width: '100%'}} spacing={5} align={'left'}>
                        <Collapse in={open}>
                            <Alert severity={message.severity}
                                   action={
                                       <IconButton
                                           aria-label="close"
                                           color="inherit"
                                           size="small"
                                           onClick={() => {
                                               setOpen(false);
                                           }}
                                       >
                                           <CloseIcon fontSize="inherit"/>
                                       </IconButton>
                                   }
                                   sx={{mb: 2}}>
                                <AlertTitle>{message.title}</AlertTitle>
                                {message.body}
                            </Alert>
                        </Collapse>
                    </Stack>
                    <h2>Select File to Upload</h2>
                    <form>
                        <label htmlFor="btn-upload">
                            <Input
                                id="btn-upload"
                                name="btn-upload"
                                style={{display: 'none'}}
                                type="file"
                                onChange={handleFileChange}
                            />
                            <Button
                                className="btn-choose"
                                variant="outlined"
                                data-testid="btn-choose"
                                component="span">
                                Choose Files
                            </Button>
                            <div data-testid="p-show-file">{file && file.name && `${file.name} - ${file.type}`}</div>

                            <br/>
                            <Button
                                className="btn-submit"
                                variant="contained"
                                data-testid="btn-submit"
                                onClick={handleUploadClick}
                                disabled={!file.name}>
                                Upload
                            </Button>
                            <br/>
                        </label>
                    </form>
                </Container>
            </div>
        </React.Fragment>

    );
}