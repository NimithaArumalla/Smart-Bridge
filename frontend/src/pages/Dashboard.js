import React, { useEffect, useState } from "react";
import { getBalance } from "../api";

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const userId = "USER_ID_HERE"; // Replace with actual user ID from login

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await getBalance(userId);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance", error);
            }
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Your Balance: ${balance}</p>
        </div>
    );
};

export default Dashboard;
