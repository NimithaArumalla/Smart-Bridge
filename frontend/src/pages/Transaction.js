import React, { useState, useEffect } from "react";
import { getBalance, depositMoney, withdrawMoney } from "../api";

const Transaction = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
     // Replace with actual logged-in account ID

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await getBalance(accountId);
            setBalance(response.data.balance);
        } catch (error) {
            setMessage("Error fetching balance");
        }
    };
    

    const [accountId, setAccountId] = useState(""); // Store account ID

    useEffect(() => {
        // Fetch account ID from local storage or backend API
        const storedAccountId = localStorage.getItem("accountId"); // Assuming account ID is stored
        if (storedAccountId) {
            setAccountId(storedAccountId);
        }
        fetchBalance();
    }, []);
    
   
    


    const handleDeposit = async () => {
        if (!amount || amount <= 0) {
            setMessage("Enter a valid deposit amount");
            return;
        }
    
        console.log("Deposit Request:", { accountId, amount }); // ✅ Debugging output
    
        try {
            const response = await depositMoney(accountId, parseFloat(amount));
            setMessage(response.data.message);
            fetchBalance();
        } catch (error) {
            console.error("Deposit Error:", error.response?.data || error); // ✅ Logs full error details
            setMessage(error.response?.data?.message || "Error in depositing money");
        }
    };
    

    const handleWithdraw = async () => {
        if (!amount || amount <= 0) {
            setMessage("Enter a valid withdrawal amount");
            return;
        }
        try {
            const response = await withdrawMoney(accountId, parseFloat(amount));
            setMessage(response.data.message);
            fetchBalance();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error in withdrawing money");
        }
    };

    return (
        <div>
            <h2>Bank Transactions</h2>
            <p>Current Balance: ${balance}</p>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Transaction;
