/// <reference types="react-scripts" />

// transaction types
type Transaction = {
    id: string, 
    type: string, 
    category: string, 
    amount: number, 
    date: string 
}

type TransactionKey =  'type' | 'amount' | 'category' | 'date'

type TransactionState = {
    transactions: Transaction[],
    balance: number
}

// global types
type RootState = {
    transaction: TransactionState
}

type Action = {
    type: 'GET_TRANSACTIONS',
    data: null
} | {
    type: 'ADD_TRANSACTION',
    data: Transaction 
} | {
    type: 'DELETE_TRANSACTION',
    data: string
}

type Dispatch = (action: Action) => any