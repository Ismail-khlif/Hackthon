const express = require('express');
const router = express.Router();

const {
    NFT_creation,
} = require('../services/NFT_creation'); 

const {
    NFT_transfer
} = require('../services/NFT_transfer'); 

router.get('/create-NFT', async (req, res) => {
    try {
        const newNFT = await NFT_creation();
        res.json({ message: "NFT created and minted successfully", newNFT });
    } catch (error) {
        console.error("Error creating NFT:", error);
        res.status(500).json({ error: "Failed to create NFT" });
    }
});

router.get('/transfer-NFT', async (req, res) => {
    try {
        const tokenId = req.query.TokenId ; 
        const secondAccountId = req.query.secondAccountId ;
        const secondPrivateKey = req.query.secondPrivateKey ;
        const NFT_data = await NFT_transfer(tokenId,secondAccountId,secondPrivateKey);
        res.json({ message: "NFT transfered successfully", NFT_data });
    } catch (error) {
        console.error("Error transfer NFT:", error);
        res.status(500).json({ error: "Failed to transfer NFT" });
    }
});

module.exports = router;