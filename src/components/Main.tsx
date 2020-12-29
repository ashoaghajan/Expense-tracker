import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from '../styles/mainStyles'
import Form from './Form';
import List from './List';

export interface MainProps {
    
}

const options = ['Add income for 100$ in Category Salary for Monday', 'Add expense for 50$ in Category Bills for Tuesday'];
const random = Math.round(Math.random());
 
const Main: React.SFC<MainProps> = () => {

    const classes = useStyles();
    const balance = useSelector((state: RootState) => state.transaction.balance);

    return ( 
        <Card>
            <CardHeader title='Income/Expense Tracker' subheader='Powered by Speechly'/>
            <CardContent>
                <Typography align='center' variant='h5'>Total Balance ${balance}</Typography>
                <Typography variant='subtitle1' className={classes.infoCard}>
                    Try saying: <br /> {random ? options[0] : options[1]}
                </Typography>
                <Divider className={classes.divider}/>
                <Form />
            </CardContent>
            <CardContent className={classes.cartContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
     );
}
 
export default Main;
