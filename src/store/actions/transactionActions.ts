export const getTransactions = () => (dispatch: Dispatch) => {
    dispatch({ type: 'GET_TRANSACTIONS', data: null })
}

export const addTransaction = (transaction: Transaction) => (dispatch: Dispatch) => {
    dispatch({ type: 'ADD_TRANSACTION', data: transaction })
}


export const deleteTransaction = (id: string) => (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_TRANSACTION', data: id })
}