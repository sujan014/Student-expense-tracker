import React, { useEffect, useState } from "react";

const AddBalance = ({ isOpen, onClose, handleNewBalance }) => {
    const [amount, setAmount] = useState(0);
    
    useEffect(() => {
        setAmount(0);
    }, [])

    const changeAmount = (event) => {
        event.preventDefault();        
        let amnt = parseInt(event.target.value);        
        setAmount(amnt);
    }
    const handleCloseForm = () => {
        setAmount(0);
        onClose();
    }
    const handleAddBalance = (event) => {
        event.preventDefault();
        console.log(`Amount: ${amount}`);
        if (amount <= 0 || isNaN(amount)) {
            alert('Enter amount.')            
        } else{
            handleNewBalance(amount);
            handleCloseForm();
        }
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
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "10px",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    background: "#89b7f1"
                }}
            >
                <h3>Add Money</h3>
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
                            min={0}
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
                            onClick={handleCloseForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBalance;