import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from '../styles/formStyles'
import { addTransaction } from '../store/actions/transactionActions';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../constants/categories';
import { useSpeechContext } from '@speechly/react-client';
import moment from 'moment'

export const useForm = () => {

    const initState = { 
        type: 'Income', 
        category: '', 
        amount: 0, 
        date: moment().format('YYYY-MM-DD')  
    }

    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initState);
    const [open, setOpen] = useState(false);
    const { segment } = useSpeechContext();

    let categories = state.type === 'Income' ? incomeCategories : expenseCategories;

    const changeState = (key: TransactionKey, value: number| string | unknown,
        key2: 'type' | 'amount' | 'category' | 'date' | '' = '', value2: number| string | unknown = '') => {

        if(key2 && value2){
            setState(prevState => ({ ...prevState, [key]: value, [key2]: value2 }));
        }
        else{
            setState(prevState => ({ ...prevState, [key]: value }));
        }
    }

    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                changeState('type', 'Expense', 'category', expenseCategories[0].type);
            }
            else if(segment.intent.intent === 'add_income'){
                changeState('type', 'Income','category', incomeCategories[0].type);
            }
            else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
                handleAddTransaction()
            }
            else if(segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                setState(initState); 
            }

            segment.entities.forEach(e => {
                switch(e.type){
                    case 'amount':
                        if(e.value && Number(e.value)){
                            changeState('amount', Number(e.value))
                        };
                        break;

                    case 'category':
                        if(e.value){
                            const category = e.value.charAt(0) + e.value.slice(1).toLowerCase();
                            if(incomeCategories.filter(iCategory => iCategory.type === category).length){
                                changeState('type', 'Income','category', category);
                            }
                            else if(expenseCategories.filter(eCategory => eCategory.type === category).length){
                                changeState('type', 'Expense','category', category);
                            }
                        }
                        break;

                    case 'date':
                        if(Date.parse(e.value)){
                            changeState('date', e.value)
                        }
                        break;

                    default:
                        break;        
                }
            });
            if(segment.isFinal && state.type && state.amount && state.category && state.date){
                handleAddTransaction();
            }
        }
        // eslint-disable-next-line
    },[segment])

    const handleChange = (e: React.ChangeEvent<{name?: string | undefined;value: unknown;}> | 
        React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: TransactionKey) => {
        e.persist();

        if(key === 'type'){
            if(e.target.value === 'Income'){
                changeState(key, e.target.value, 'category', incomeCategories[0].type);
                categories = incomeCategories;
            }
            else if(e.target.value === 'Expense'){
                changeState(key, e.target.value, 'category', expenseCategories[0].type);
                categories = expenseCategories;
            }
        }
        else{
            changeState(key, e.target.value);
        }
    }

    const handleAddTransaction = () => {
        dispatch(addTransaction({
            ...state, 
            amount: Number(state.amount),
            id: uuidv4()
        }));
        setOpen(true);
        setState(initState);
    }

    return { state, classes, segment, categories, handleChange, handleAddTransaction, open, setOpen }
}