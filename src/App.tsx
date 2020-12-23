import React from 'react';
import { Grid } from '@material-ui/core';
import Details from './components/Details';
import useStyles from './styles/appStyles'
import Main from './components/Main';

function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <Grid className={classes.grid} container spacing={0} alignItems='center' justify='center'>
        <Grid item xs={12} sm={4}> 
          <Details title='Income'/>
        </Grid>
        <Grid item xs={12} sm={3}> 
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}> 
          <Details title='Expense'/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
