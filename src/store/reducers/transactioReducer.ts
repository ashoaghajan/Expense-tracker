const initState = {
    transactions: [],
    balance: 0
}

export const transactionReducer = (state: TransactionState = initState, action: Action) => {
    switch(action.type){

        case 'GET_TRANSACTIONS':
            const transactions: Transaction[] = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')!) : [];
            const balance = transactions.length ? transactions.reduce((acc, curr) => (
                curr.type === 'Income' ? acc += Number(curr.amount) : acc -= Number(curr.amount)
            ), 0) : 0;
            return {
                ...state,
                transactions,
                balance
            } 

        case 'ADD_TRANSACTION':
            const newData = [action.data, ...state.transactions];
            localStorage.setItem('transactions', JSON.stringify(newData));
            return {
                transactions: newData
            }  

        case 'DELETE_TRANSACTION':
            const filteredData = state.transactions.filter(item => item.id !== action.data);
            localStorage.setItem('transactions', JSON.stringify(filteredData));
            return {
                ...state,
                transactions: filteredData
            }

        default:
            return state      
    }
}