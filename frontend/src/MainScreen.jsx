import { useEffect, useState } from "react";
import Balance from "./user_components/Accounts";
import ExpenseTable from "./user_components/ExpenseTable";
import HeaderField from "./user_components/headerField";
import axios from "axios";

const UserScreen = ({userId, logOut}) => {
    const [balance, setbalance] = useState(0);
    const [expenses, setExpenses] = useState(0);

    const fetchStudent = async () => {
        try{
            let result = await axios.get(`http://localhost:3000/studentDetail/${userId}`);
            if (result.status === 200){
                let getBalance = result.data.data.balance;
                let getExpenses = result.data.data.expenses;                
                setbalance(getBalance);
                setExpenses(getExpenses)
            }
        } catch(error){
            console.log(error);
            alert('Error fetching data');
        }
    }
    useEffect(() => {
        fetchStudent();
    }, []);
    return(
        <div className="expense-screen">
            <HeaderField logout={logOut}/>
            <Balance userId={userId} balance={balance} expense={expenses}/>
            <ExpenseTable userId={userId} />
        </div>
    )
}

export default UserScreen;