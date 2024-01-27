const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function createMultipleAccounts(numAccounts) {
    const accounts = [];

    for (let i = 0; i < numAccounts; i++) {
        const { accountId, privateKey } = await createAccount();
        accounts.push({ accountId, privateKey });
    }

    return accounts;
}

async function createAccount() {
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    if (myAccountId == null || myPrivateKey == null) {
        throw new Error(
            "Environment variables myAccountId and myPrivateKey must be present"
        );
    }

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));

    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(10001))
        .execute(client);

    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    console.log("\nNew account ID: " + newAccountId);

    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log(
        "The new account balance is: " +
        accountBalance.hbars.toTinybars() +
        " tinybar."
    );

    return { accountId: newAccountId.toString(), privateKey: newAccountPrivateKey.toString() };
}

async function transferFunds(senderId, senderPrivateKey, receiverId,amount) {
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));

    console.log("Sender Account ID:", senderId);
    console.log("Sender Private Key:", senderPrivateKey);
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(senderId)
        .execute(client);

    console.log(
        "\n reciver account balance is: " +
        accountBalance.hbars.toTinybars() +
        " tinybars."
    );
    const requiredBalance = 500; // Adjust this based on your expected transaction fees
    if (accountBalance.hbars.toTinybars() < requiredBalance) {
        console.error("Error: Sender account does not have enough balance for the transfer.");
        return;
    }

    // Create the transfer transaction
    const sendHbar = await new TransferTransaction()
        .addHbarTransfer(process.env.MY_ACCOUNT_ID, Hbar.fromTinybars(-amount))
        .addHbarTransfer(senderId, Hbar.fromTinybars(amount))
        .execute(client);

    // Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log(
        "\nThe transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );
    const accountBalanceea = await new AccountBalanceQuery()
        .setAccountId(senderId)
        .execute(client);
    console.log(
        "\nreciver account balance after is: " +
        accountBalanceea.hbars.toTinybars() +
        " tinybars."
    );
    const accountBalancee = await new AccountBalanceQuery()
        .setAccountId(process.env.MY_ACCOUNT_ID)
        .execute(client);

    console.log(
        "\nSender account balance  is: " +
        accountBalancee.hbars.toTinybars() +
        " tinybars."
    );
    return
}

async function main() {
    const numberOfAccounts = 3;
    const accountIds = await createMultipleAccounts(numberOfAccounts);
    console.log("hhhh",accountIds);
    // Accessing the num property of the first AccountId object in the array
    const numValue = accountIds[0].accountId;
    const pk = accountIds[0].privateKey;
    const numValue1 = accountIds[1].accountId;
    const pk1 = accountIds[1].privateKey;
    console.log("The value of num for the first account is:", numValue);

    // Perform transactions between the accounts
    await transferFunds(numValue, pk, process.env.MY_ACCOUNT_ID,700);
   // await transferFunds(numValue1, pk1, process.env.MY_ACCOUNT_ID);
}

//main();
module.exports = {
    createMultipleAccounts,
    createAccount,
    transferFunds
};