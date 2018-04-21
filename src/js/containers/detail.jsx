import React, { Component } from 'react'

import { getAccount, getInstance } from '../web3'
import { Loading } from '../components'

export class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      buying: false,
      order: {},
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }
  async componentDidMount() {
    const instance = await getInstance()
    const i = parseInt(this.props.match.params.id)
    const _order = await instance.getOrder(i)
    // address _owner, uint256 _price, address _issuer, uint256 _tokenId, string _title, string _desc
    console.log(_order)
    const order = {
      id: i,
      owner: _order[0],
      price: _order[1].toNumber(),
      issuer: _order[2],
      tokenId: _order[3],
      title: _order[4],
      desc: _order[5],
    }
    this.setState({
      loading: false,
      order,
    })
  }
  async onBuy() {
    await this.setStateAsync({ buying: true })
    try {
      const instance = await getInstance()
      const account = await getAccount()
      const tx = await instance.buy(this.state.order.id, {
        gas: 6721975,
        value: this.state.order.price,
      })
      console.log(tx)
    } catch (e) {
      alert('Error: ' + e.message)
    }
    await this.setStateAsync({ buying: false })
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    const { order } = this.state
    return (
      <div id="detail" className="py-5 bg-light">
        <div className="container">
          <h1>Detail</h1>
          <br/>
          <div className="row">
            <div className="col-md-4">
              <img className="card-img-top" alt="Thumbnail [100%x225]" src="/img/1.png" data-holder-rendered="true" />
            </div>
            <div className="col-md-8">
              <p className="card-text item-title">{ order.title }</p>
              <p className="card-text item-desc">{ order.desc }</p>
              <p className="card-text item-owner">Owned by: <a href={'#' + order.owner}>{ order.owner }</a></p>
              <button className="btn btn-sm btn-outline-secondary item-buy" onClick={this.onBuy.bind(this)}>Buy at { order.price } ETH</button>&nbsp;
              <small className="item-ordered-time" className="text-muted">Published: 9 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
