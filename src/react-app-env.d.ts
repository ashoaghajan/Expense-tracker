/// <reference types="react-scripts" />

// transaction types
type Transaction = {
    id: string, 
    type: string, 
    category: string, 
    amount: string, 
    date: string 
}

type TransactionState = {
    transactions: Transaction[]
}

// global types
type RootState = {
    transaction: TransactionState
}

type Action = {
    type: 'GET_TRANSACTIONS',
    data: Transaction[]
} | {
    type: 'ADD_TRANSACTION',
    data: Transaction 
} | {
    type: 'DELETE_TRANSACTION',
    data: string
}

type Dispatch = (action: Action) => any