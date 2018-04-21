'use strict'

import Web3, { providers } from 'web3'
import TruffleContract from 'truffle-contract'
import AdoptionArtifact from '../../build/contracts/SponsorToken.json'

let provider

if (typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider
} else {
  // set the provider you want from Web3.providers
  provider = new providers.HttpProvider('http://localhost:8545')
}

const web3 = new Web3(provider)
const SponsorToken = TruffleContract(AdoptionArtifact)
SponsorToken.setProvider(provider)

let stInstance

web3.eth.getAccounts(function (error, accounts) {
  if (error) {
    console.log(error)
    return
  }

  var account = accounts[0]
  console.log('account', account)

  SponsorToken.deployed().then(function (instance) {
    stInstance = instance

    // Execute adopt as a transaction by sending account
    return stInstance.name.call()
  }).then(function (result) {
    console.log('result', result)
  }).catch(function (err) {
    console.error(err)
  })
})
