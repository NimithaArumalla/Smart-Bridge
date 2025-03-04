const express = require("express");
const { createAccount, getBalance, depositMoney, withdrawMoney } = require("../controllers/accountController"); // ✅ Ensure correct import

const router = express.Router();

router.post("/create", createAccount);
router.get("/balance/:userId", getBalance);
router.post("/deposit", depositMoney);
router.post("/withdraw", withdrawMoney);

module.exports = router;
