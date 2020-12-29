import React from 'react';
import { useForm } from '../hooks/useForm';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SnackBar from './SnackBar';

export interface FormProps {
    
}
 
const Form: React.SFC<FormProps> = () => {

    const { state, classes, segment, categories, handleChange, handleAddTransaction, open, setOpen } = useForm(); 

    return ( 
        <Grid container spacing={2}>
            <SnackBar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment && segment.words.map(word => word.value).join(' ')}
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
                        {categories.map(item => (
                            <MenuItem key={item.type} value={item.type}>{item.type}</MenuItem>
                        ))}
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
