import { useSelector } from 'react-redux';
import { resetCategories, incomeCategories, expenseCategories } from '../constants/categories';

export const useTransactions = (title: 'Income' | 'Expense') => {
    resetCategories();
    const transactions = useSelector((state: TransactionState) => state.transactions);

    const filteredTrans = transactions.filter(transaction => transaction.type === title);
    const total = filteredTrans.reduce((acc, curr) => acc += curr.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    filteredTrans.forEach(trans => {
        const category = categories.find(categ => categ.type === trans.category);
        if(category){
            category.amount += trans.amount
        }
    });

    const filteredCategories = categories.filter(category => category.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map(category => category.amount),
            backgroundColor: filteredCategories.map(category => category.color)
        }],
        labels: filteredCategories.map(category => category.type) 
    }

    return { total, chartData }
}