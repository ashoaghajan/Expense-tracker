import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Details from './components/Details';
import useStyles from './styles/appStyles'
import Main from './components/Main';
import { getTransactions } from './store/actions/transactionActions';
import { PushToTalkButtonContainer, PushToTalkButton, ErrorPanel } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client'

function App() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { speechState } = useSpeechContext();
  const main: any = useRef(null);

  
  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    dispatch(getTransactions());
    // eslint-disable-next-line 
  },[]);

  useEffect(() => {
    if(speechState === SpeechState.Recording){
      executeScroll();
    }
  },[speechState])

  return (
    <div className="App">
      <Grid className={classes.grid} container spacing={0} alignItems='center' justify='center'>
        <Grid item xs={12} sm={4} className={classes.desktop}> 
          <Details title='Income'/>
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}> 
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.mobile}> 
          <Details title='Income'/>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}> 
          <Details title='Expense'/>
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
