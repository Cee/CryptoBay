'use strict'

import Web3, { providers } from 'web3'

let web3

if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new providers.HttpProvider('http://localhost:8545'))
}

var coinbase = web3.eth.coinbase;
console.log(coinbase)

var balance = web3.eth.getBalance(coinbase);
console.log(balance)
