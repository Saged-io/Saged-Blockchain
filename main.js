
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('8c41b3ee000240eda5414cde75cc49bca3a5768b50c1e6f7db004aca66476a9c', 10)
const myWalletAddress = myKey.getPublic('hex');


let saged_blockchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress,"04abb0e21507c1132f66cc8525c4a27d1f4836e24e87d22fba1e8bb87d4bd6321f897b4cda821ceae956da6ab491773b4c836fe12cff5f9f3642b3f9a5be7a0897");

console.log('\n Starting the miner');
saged_blockchain.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Ayush is', saged_blockchain.getBalanceofAddress(myWalletAddress));


