import React, { Component } from 'react'

import { web3, getBalance, getAccount } from '../web3'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { balance: null }
  }
  async componentDidMount() {
    const account = await getAccount()
    let balance = await getBalance(account)
    balance = web3.fromWei(balance, 'ether').toFixed(2)
    this.setState({ balance })
  }
  render() {
    const { balance } = this.state
    return (
      <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>CryptoBay</strong>
            </a>
            <span>
              <span className="balance">{ balance ? `${balance} ETH` : null }</span>&nbsp;
              <a className="btn btn-outline-warning" href="/publish">Publish</a>
            </span>
          </div>
        </div>
      </header>
    )
  }
}
