import React from 'react'
import ReactDOM from 'react-dom'

import Web3, { providers } from 'web3'
import TruffleContract from 'truffle-contract'
import SponsorTokenArtifact from '../../build/contracts/SponsorToken.json'

import App from './containers'
import { HTTP_PROVIDER_URL } from './api'

let provider

if (typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider
} else {
  // set the provider you want from Web3.providers
  provider = new providers.HttpProvider(HTTP_PROVIDER_URL)
}

const web3 = new Web3(provider)
const SponsorToken = TruffleContract(SponsorTokenArtifact)
SponsorToken.setProvider(provider)

let stInstance

web3.eth.getAccounts(function (error, accounts) {
  if (error) {
    console.log(error)
    return
  }

  const account = accounts[0]
  console.log('account', account)

  SponsorToken.deployed().then(function (instance) {
    stInstance = instance

    return stInstance.name.call()
  }).then(function (result) {
    console.log('result', result)
  }).catch(function (err) {
    console.error(err)
  })
})

ReactDOM.render(<App />, document.getElementById('app'))
