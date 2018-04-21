import React, { Component } from 'react'

import { web3, getInstance } from '../web3'
import { Loading } from '../components'

export class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      orders: [],
    }
  }
  async componentDidMount() {
    const instance = await getInstance()
    const totalOrderCount = (await instance.totalOrder()).toNumber()
    const orders = []
    for (let i = 0; i < totalOrderCount; i++) {
      const order = await instance.getOrder(i)
      // address _owner, uint256 _price, address _issuer, uint256 _tokenId, string _title, string _desc
      orders.push({
        id: i,
        owner: order[0],
        price: order[1].toNumber(),
        issuer: order[2],
        tokenId: order[3],
        title: order[4],
        desc: order[5],
      })
    }
    this.setState({
      loading: false,
      orders,
    })
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div id="store" className="py-5 bg-light">
        <div className="container">
          <h1>Market</h1>
          <br/>
          <div className="row">
            {this.state.orders.map((order, i) => {
              return (
                <div key={i} className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" alt="Thumbnail [100%x225]" src="/img/1.png" data-holder-rendered="true" />
                    <div className="card-body">
                      <p className="card-text item-title">{ order.title }</p>
                      <p className="card-text item-desc">{ order.desc }</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <a className="btn btn-sm btn-outline-secondary item-buy" href={'/detail/' + order.id}>Buy at { order.price } ETH</a>
                        </div>
                        <small className="item-ordered-time" className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
