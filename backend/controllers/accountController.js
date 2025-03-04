const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
    const { userId } = req.body;
    try {
        const account = new Account({ userId, balance: 0 });
        await account.save();
        res.status(201).json({ message: "Account Created Successfully", account });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error });
    }
};

exports.getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.params.userId });
        if (!account) return res.status(404).json({ message: "Account not found" });

        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance", error });
    }
};

exports.depositMoney = async (req, res) => {
    const { accountId, amount } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ message: "Account not found" });

        account.balance += amount;
        await account.save();
        res.status(200).json({ message: "Deposit Successful", balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Error in depositing money", error });
    }
};

exports.withdrawMoney = async (req, res) => {
    const { accountId, amount } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ message: "Account not found" });

        if (account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        account.balance -= amount;
        await account.save();
        res.status(200).json({ message: "Withdrawal Successful", balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Error in withdrawing money", error });
    }
};
