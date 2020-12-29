import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, 
    Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from '../styles/listStyles';    
import { deleteTransaction } from '../store/actions/transactionActions';

export interface ListProps {
    
}
 
const List: React.SFC<ListProps> = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transaction.transactions);

    const handleDelete = (id: string) => {
        dispatch(deleteTransaction(id));
    }

    return ( 
        <MUIList dense={false} className={classes.list}>
            {transactions.length ? transactions.map(transaction=> (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}` }/>
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete' onClick={() => {handleDelete(transaction.id)}}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            )): <h5>You have no transactions</h5>}
        </MUIList>
    );
}
 
export default List;
