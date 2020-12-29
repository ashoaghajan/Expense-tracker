const initState = {
    transactions: [],
    balance: 0
}

export const transactionReducer = (state: TransactionState = initState, action: Action) => {
    let balance = 0;

    const getBalance = (transactions: Transaction[]) => (
        transactions.length ? transactions.reduce((acc, curr) => (
            curr.type === 'Income' ? acc += Number(curr.amount) : acc -= Number(curr.amount)
        ), 0) : 0
    )

    switch(action.type){
        case 'GET_TRANSACTIONS':
            const transactions: Transaction[] = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')!) : [];
            balance = getBalance(transactions);
            return {
                ...state,
                transactions,
                balance
            } 

        case 'ADD_TRANSACTION':
            const newData = [action.data, ...state.transactions];
            localStorage.setItem('transactions', JSON.stringify(newData));
            balance = getBalance(newData);
            return {
                ...state,
                transactions: newData,
                balance
            } 

        case 'DELETE_TRANSACTION':
            const filteredData = state.transactions.filter(item => item.id !== action.data);
            localStorage.setItem('transactions', JSON.stringify(filteredData));
            balance = getBalance(filteredData)
            return {
                ...state,
                transactions: filteredData,
                balance
            }

        default:
            return state      
    }
}