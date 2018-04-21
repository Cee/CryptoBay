import Web3, { providers } from 'web3'
import TruffleContract from 'truffle-contract'
import DecentralizedExchangeArtifact from '../../build/contracts/DecentralizedExchange.json'

import { HTTP_PROVIDER_URL } from './api'

let provider

if (typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider
} else {
  // set the provider you want from Web3.providers
  provider = new providers.HttpProvider(HTTP_PROVIDER_URL)
}

export const web3 = new Web3(provider)
const DecentralizedExchange = TruffleContract(DecentralizedExchangeArtifact)
DecentralizedExchange.setProvider(provider)

let stInstance = null
let account = null

export function getAccounts() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts(function (err, accounts) {
      if (err) {
        return reject(err)
      }
      DecentralizedExchange.web3.eth.defaultAccount = DecentralizedExchange.web3.eth.coinbase
      account = accounts[0]
      resolve(accounts)
    })
  })
}

export function getAccount() {
  return getAccounts().then(() => account)
}

export async function getInstance() {
  if (stInstance) {
    return stInstance
  }
  stInstance = await DecentralizedExchange.deployed()
  return stInstance
}

// address _issuer, uint256 _tokenId, uint256 _price, string _title, string _desc
/*return stInstance.put(account, 1, 1, 'Cee', '233', {
  gas: 6721975
})*/
// return stInstance.getOrder(0)
