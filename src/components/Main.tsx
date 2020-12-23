import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from '../styles/mainStyles'
import Form from './Form';
import List from './List';

export interface MainProps {
    
}
 
const Main: React.SFC<MainProps> = () => {

    const classes = useStyles();

    return ( 
        <Card>
            <CardHeader title='Expense Tracker' subheader='Powered by Speechly'/>
            <CardContent>
                <Typography align='center' variant='h5'>Total Balance $100</Typography>
                <Typography variant='subtitle1' className={classes.infoCard}>
                    Try saying: Add income for 100$ in Category Salary for Monday
                </Typography>
                <Divider />
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
