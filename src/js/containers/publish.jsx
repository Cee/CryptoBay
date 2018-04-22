import React, { Component } from 'react'
import { web3, getAccounts, getInstance } from '../web3'
import { Modal } from '../components'

export class Publish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.titleInput = React.createRef()
    this.descInput = React.createRef()
    this.priceInput = React.createRef()
    this.modal = React.createRef()
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }
  async onSubmit() {
    await this.setStateAsync({ loading: true })
    const title = this.titleInput.current.value
    const desc = this.descInput.current.value
    let price = this.priceInput.current.value
    if (!title || !desc || !price) {
      this.modal.current.show('Error', (
        <p>Please input title / desc / price field!</p>
      ))
    } else {
      price = parseFloat(price)
      if (!price) {
        this.modal.current.show('Error', (
          <p>Invalid price!</p>
        ))
      } else {
        const accounts = await getAccounts()
        const instance = await getInstance()
        try {
          const priceWei = web3.toWei(price, 'ether')
          // address _issuer, uint256 _tokenId, uint256 _price, string _title, string _desc
          const tx = await instance.put(accounts[1], 1, priceWei, title, desc, {
            gas: 6721975
          })
          this.titleInput.current.value = ''
          this.descInput.current.value = ''
          this.priceInput.current.value = ''
          this.modal.current.show('Success', (
            <p>
              Publish success!<br />
              <span style={{fontSize: '10px', color: '#ccc'}}>tx: {tx.tx}</span>
            </p>
          ))
        } catch (e) {
          this.modal.current.show('Error', (
            <p>Publish failed:<br />{e.message}</p>
          ))
        }
      }
    }
    await this.setStateAsync({ loading: false })
  }
  render() {
    return (
      <div className="py-5 bg-light">
        <div className="container">
          <h1>Publish</h1>
          <br/>
          <div className="row">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Title</span>
                </div>
                <input ref={this.titleInput} type="text" className="form-control form-title" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Description</span>
                </div>
                <textarea ref={this.descInput} className="form-control" aria-label="Description" placeholder="Description"></textarea>
              </div>
              <br/>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">Price</span>
                </div>
                <input ref={this.priceInput} type="text" className="form-control form-title" placeholder="0.1" aria-label="Price" aria-describedby="basic-addon3" />
                <div className="input-group-append">
                  <span className="input-group-text">ETH</span>
                </div>
              </div>
              <button type="button"
                className="btn btn-primary"
                disabled={this.state.loading}
                onClick={this.onSubmit.bind(this)}>Submit</button>
            </div>
          </div>
        </div>
        <Modal id="publish-modal" ref={this.modal} />
      </div>
    )
  }
}
