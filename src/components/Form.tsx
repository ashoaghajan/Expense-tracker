import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from '../styles/formStyles'
import { addTransaction } from '../store/actions/transactionActions';
import { v4 as uuidv4 } from 'uuid';

export interface FormProps {
    
}

const initState = { 
    type: 'Income', 
    category: '', 
    amount: '', 
    date: '2020-12-15'
}
 
const Form: React.SFC<FormProps> = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initState);

    const handleChange = (e: React.ChangeEvent<{name?: string | undefined;value: unknown;}> | 
        React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: string) => {

        e.persist();
        setState(prevState => ({
            ...prevState,
            [key]: e.target.value
        }))
    }

    const handleAddTransaction = () => {
        const id = uuidv4();
        dispatch(addTransaction({id, ...state}))
    }

    return ( 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={state.type} onChange={(e) => handleChange(e, 'type')}>
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value='Expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={state.category} onChange={(e) => handleChange(e, 'category')}>
                        <MenuItem value='business'>business</MenuItem>
                        <MenuItem value='salary'>salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label='Amount' fullWidth value={state.amount} onChange={(e) => handleChange(e, 'amount')}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='date' fullWidth value={state.date} onChange={(e) => handleChange(e, 'date')}/>
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={handleAddTransaction}>Create</Button>
        </Grid>
    );
}
 
export default Form;
