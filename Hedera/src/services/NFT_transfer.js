console.clear();
require("dotenv").config();
const {
    PrivateKey,
    Client,
    TransferTransaction,
    TokenNftInfoQuery,
    TokenAssociateTransaction,
    TokenId,
    NftId,
} = require("@hashgraph/sdk");


const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromStringDer(process.env.MY_PRIVATE_KEY);
const secondAccountId = process.env.SECOND_ACCOUNT_ID;
const secondPrivateKey = PrivateKey.fromStringDer(
    process.env.SECOND_PRIVATE_KEY
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function transferNFT(senderId, receiverId, nftId) {
    let tokenTransferTx = await new TransferTransaction()
        .addNftTransfer(nftId.tokenId, nftId.serial, senderId, receiverId)
        .execute(client);

    let tokenTransferRx = await tokenTransferTx.getReceipt(client);

    console.log(`\n- NFT transfer : ${tokenTransferRx.status.toString()} \n`);
}

async function nftInfoQuery(nftId) {
    console.log("NftInfoQuery----------------");
    //Returns the info for the specified NFT ID
    const nftInfo = await new TokenNftInfoQuery().setNftId(nftId).execute(client);
    console.log(JSON.stringify(nftInfo, null, 4));
    console.log("-----------------------------------");
}

async function associateToken(tokenId, accountId, accountPrivateKey) {
    console.log("AssociateToken----------------");
    let associateTokenTx = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(client);

    let associationSign = await associateTokenTx.sign(accountPrivateKey);
    let associationSubmit = await associationSign.execute(client);
    let receipt = await associationSubmit.getReceipt(client);
    console.log("Associate Token: ", receipt.status.toString());
    console.log("-----------------------------------");
}

async function NFT_transfer(tokenId,secondAccountIdd,secondPrivateKeyy) {
    //const tokenId = "0.0.7728599";
    const secondPrivateKeyyy =PrivateKey.fromStringDer(
        secondPrivateKeyy
    );
    const nftId = new NftId(TokenId.fromString(tokenId), 2);
    console.log(nftId);
    await nftInfoQuery(nftId);
    await associateToken(tokenId, secondAccountIdd, secondPrivateKeyyy);
    await transferNFT(myAccountId, secondAccountIdd, nftId);
    await nftInfoQuery(nftId);
}
//main();
module.exports = {
    NFT_transfer,
};