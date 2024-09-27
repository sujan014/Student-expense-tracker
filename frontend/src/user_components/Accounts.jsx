import { useState } from "react";
import AddBalance from "./AddMoney";
import AddExpense from "./AddExpense";
import axios from "axios";

export default function Balance({userId, balance, expense}){
    const [addBalance, setAddBalance] = useState(false);
    const [addExpense, setAddExpense] = useState(false);

    const handleAddBalance = (event) => {
        event.preventDefault();
        setAddBalance(true);
    }
    const closeForms = () => {
        setAddBalance(false);
        setAddExpense(false);
    }
    const handleAddExpense = (event) => {
        event.preventDefault();        
    }
    const handleNewBalance = (amount) => {
        try{
            let updatedAmount = balance + amount;
            console.log(`${updatedAmount} : ${typeof(updatedAmount)}`);
            AddBalanceApi(updatedAmount);
        }
        catch(error){
            alert('Not a number');
        }
    }
    const handleNewExpense = (amount, title, category, date) => {
        console.log(`New Expense: ${amount}, ${title}, ${category}, ${date}`);
    }
    const AddBalanceApi = async(amount) => {
        try{
            var response = await axios.patch(`http://localhost:3000/updateBalance`,
                {
                    id: userId,
                    amount: amount
                }
            )
            console.log(response);
            if (response.status === 200){
                alert(`Balance updated successfully.`);
            } else{
                alert('Balance update was unsuccessfull.');
            }
        }
        catch(error){
            console.log(error);
            alert('Axios error');
        }
    }

    return(
        <div className="account-field">
            <div className="account-card">
                <p>Wallet balance: ${balance}</p>
                <button 
                    className="function-button"
                    onClick={handleAddBalance}
                >
                    + Add Money
                </button>
            </div>
            <div className="account-card">
                <p>Expense: ${expense}</p>
                <button 
                    className="function-button"
                    onClick={setAddExpense}
                >
                    + Add Expense
                </button>
            </div>
            <AddBalance isOpen={addBalance} onClose={closeForms} handleNewBalance={handleNewBalance} />                            
            <AddExpense isOpen={addExpense} onClose={closeForms} handleNewExpense={handleNewExpense} />
        </div>
    )
}