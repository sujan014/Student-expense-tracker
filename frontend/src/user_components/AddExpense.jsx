import React, { useEffect, useState } from "react";

const AddExpense = ({ isOpen, onClose, handleNewExpense }) => {
    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [expDate, setExpDate] = useState(new Date())
    
    useEffect(() => {
        setAmount(0);
    }, [])

    const changeAmount = (event) => {
        event.preventDefault();
        let amnt = parseInt(event.target.value);
        setAmount(amnt);
    }
    const changeTitle = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    }
    const changeCategory = (event) => {
        event.preventDefault();
        setCategory(event.target.value);
    }
    const changeDate = (event) => {
        event.preventDefault();
        setExpDate(event.target.value);
    }
    const handleAddBalance = (event) => {
        event.preventDefault();
        if (!amount || !title || !category){
            alert('Enter all fields');
            return;
        }        
        handleNewExpense(amount, title, category, expDate);
        onClose();
    }    

    if (!isOpen) return null;
 
    return (
        <div            
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    // background: "white",                    
                    width: 240,
                    margin: "auto",
                    padding: "10px",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    background: "#89b7f1"
                }}
            >
                <h3>Add Expense</h3>
                <form
                    onSubmit={handleAddBalance}
                >
                    <div className="form-row">
                        <label 
                            htmlFor="add-amount"
                            className="form-label"
                        >
                            Amount
                        </label>
                        <input 
                            className="form-input"
                            value={amount}
                            type="number"
                            name='add-amount'
                            onChange={changeAmount}                            
                        />                        
                    </div>
                    <div className="form-row">
                        <label 
                            htmlFor="title"
                            className="form-label"
                        >
                            Title
                        </label>
                        <input 
                            className="form-input"
                            value={title}
                            type="text"
                            name='title'
                            onChange={changeTitle}
                        />                        
                    </div>
                    <div className="form-row">
                        <label 
                            htmlFor="category"
                            className="form-label"
                        >
                            Category
                        </label>
                        <input 
                            className="form-input"
                            value={category}
                            type="text"
                            name='category'
                            onChange={changeCategory}
                        />                        
                    </div>
                    <div className="form-row">
                        <label 
                            htmlFor="date"
                            className="form-label"
                        >
                            Date
                        </label>
                        <input 
                            className="form-input"
                            value={expDate}
                            type="date"
                            name='date'
                            onChange={changeDate}
                        />                        
                    </div>
                    <div className="form-row">
                        <button
                            className="function-button-2"
                            type='submit'
                        >
                            Submit
                        </button>
                        <button
                            className="function-button-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExpense;