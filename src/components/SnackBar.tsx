import React from 'react';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useStyles from '../styles/snackbarStyles';

export interface SnackBarProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
 
const SnackBar: React.SFC<SnackBarProps> = ({ open, setOpen }) => {

    const classes = useStyles();

    const handleClose= (e: React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
        if(reason === 'clickaway') return;

        setOpen(false);
    }

    return ( 
        <div className={classes.root}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={'success'} elevation={6} variant='filled'>
                    Transaction successfully created.
                </Alert>    
            </Snackbar>
        </div>
    );
}
 
export default SnackBar;
