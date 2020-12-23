const initState = {
    transactions: [
        { id: '1', type: 'Income', category: 'Salary', amount: '800', date: 'Wed Dec 21' }, 
        { id: '2', type: 'Expense', category: 'Rent',  amount: '350', date: 'Wed Dec 22' },
        { id: '3', type: 'Expense', category: 'Food',  amount: '150', date: 'Wed Dec 23' }
    ]
}

export const transactionReducer = (state: TransactionState = initState, action: Action) => {
    switch(action.type){
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.data
            } 
        case 'ADD_TRANSACTION':
            return {
                transactions: [action.data, ...state.transactions]
            }     
        case 'DELETE_TRANSACTION':
            const filteredData = state.transactions.filter(item => item.id !== action.data)
            return {
                ...state,
                transactions: filteredData
            }
        default:
            return state      
    }
}