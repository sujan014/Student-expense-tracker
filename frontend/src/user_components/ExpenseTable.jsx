import axios from "axios";
import { useEffect, useState } from "react"
import { BarChart } from "../chart_component/BarChart";

import { CategoryScale} from 'chart.js';
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

export default function ExpenseTable({userId}){
    const [transactions, setTransactions] = useState([]);
    const [cData, setCData] = useState({});
    const [showChart, setShowChart] = useState(false);

    const fetchTransaction = async () => {
        try{
            let response = await axios.get(`http://localhost:3000/transaction/${userId}`)            
            if (response.status === 200){
                let newData = response.data.data
                console.log(newData)
                setTransactions(newData);
                let newObj = newData.map((item, index) => {
                    let obj = {
                        id: index,
                        value: item.amount,
                        description: item.description
                    }
                    return obj;
                });
                //console.log('New expense object');
                //console.log(newObj);
                
                setCData({
                    labels: newObj.map((data) => data.id),
                    datasets: [
                      {
                        label: "Users Gained ",
                        data: newObj.map((data) => data.value),
                        backgroundColor: [
                        //   "#ff0000",
                        //   "#00ff00",
                        //   "#0000ff",
                        //   "#ff00ff"
                          "rgba(75,192,192,1)",
                          "#ecf0f1",
                          "#f0331a",
                          "#f3ba2f",
                          "#2a71d0"
                        ],
                        borderColor: "black",
                        borderWidth: 2
                      }
                    ]
                  });
                  setShowChart(true);

            } else{
                console.log(`Response status ${response.status}`);
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTransaction();
    }, []);
    return(
        <div>
            <table 
                border='1'
                className="expense-table"
            >
                <thead>
                    <tr>
                        <td>Expense(Category)</td>
                        <td>Amount</td>
                        <td>Date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>
                                <button>Details</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showChart ? 
                <div className="chart-app">
                    <BarChart chartData={cData} chartName={"Expense chart"}/>
                </div> :
                null
            }
        </div>
    )
}