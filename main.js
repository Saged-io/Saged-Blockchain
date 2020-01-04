const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor( timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();  
        }

        console.log("Block mined:" + this.hash);
    }
} 



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = []
        this.miningRewards = 100;
    }

    createGenesisBlock(){
        return new Block( "04/01/2019", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions (miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log(' Block Successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningRewards)
        ];
    }

    createTransaction(transactions){
        this.pendingTransactions.push(transactions);
    }

    getBalanceofAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -=trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if(currentBlock.hash !== currentBlock.calculateHash()){ return false;}
            if(currentBlock.previousHash !== previousBlock.hash){ return false;}
        }
        return true;
    }

}

let saged_blockchain = new Blockchain();
saged_blockchain.createTransaction(new Transaction('address1', 'address2', 100));
saged_blockchain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
saged_blockchain.minePendingTransactions('Ayush-address');

console.log('\n Starting the miner...');
saged_blockchain.minePendingTransactions('Ayush-address');

console.log('\nBalance of Ayush is', saged_blockchain.getBalanceofAddress('Ayush-address'))   


