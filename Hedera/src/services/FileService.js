const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
    FileCreateTransaction
} = require("@hashgraph/sdk");
require("dotenv").config();

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromStringDer(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);
async function FileCreateTransaction(numAccounts) {
    //Create the transaction
const transaction = await new FileCreateTransaction()
.setKeys([filePublicKey]) //A different key then the client operator key
.setContents("the file contents")
.setMaxTransactionFee(new Hbar(2))
.freezeWith(client);

//Sign with the file private key
const signTx = await transaction.sign(fileKey);

//Sign with the client operator private key and submit to a Hedera network
const submitTx = await signTx.execute(client);

//Request the receipt
const receipt = await submitTx.getReceipt(client);

//Get the file ID
const newFileId = receipt.fileId;

console.log("The new file ID is: " + newFileId);

}
module.exports = {
    FileCreateTransaction
};