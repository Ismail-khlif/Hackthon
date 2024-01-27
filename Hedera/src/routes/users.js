const express = require('express');
const router = express.Router();

const {
    createMultipleAccounts,
    createAccount,
    transferFunds
} = require('../services/UserService'); 


router.get('/create-multiple-accounts', async (req, res) => {
    try {
        const numberOfAccounts = req.query.numAccounts || 3; 
        const accountIds = await createMultipleAccounts(numberOfAccounts);
        res.json({ message: "Accounts created successfully", accountIds });
    } catch (error) {
        console.error("Error creating accounts:", error);
        res.status(500).json({ error: "Failed to create accounts" });
    }
});
// http://localhost:3000/users/create-account
router.get('/create-account', async (req, res) => {
    try {
        const newAccount = await createAccount();
        res.json({ message: "Account created successfully", newAccount });
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Failed to create account" });
    }
});
// http://localhost:3000/users/transfer-funds
router.get('/transfer-funds', async (req, res) => {
    try {
        const senderId = req.query.senderId;
        const senderPrivateKey = req.query.senderPrivateKey;
        const receiverId = req.query.receiverId;
        const amount = req.query.amount;
        const transferFund= await transferFunds(senderId, senderPrivateKey, receiverId, amount);
        res.json({ message: "Funds transferred successfully" ,transferFund});
    } catch (error) {
        console.error("Error transferring funds:", error);
        res.status(500).json({ error: "Failed to transfer funds" });
    }
});

module.exports = router;
