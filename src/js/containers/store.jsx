import React, { Component } from 'react'

export class Store extends Component {
  render() {
    return (
      <div id="store" className="py-5 bg-light">
        <div className="container">
          <h1>Market</h1>
          <br/>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" alt="Thumbnail [100%x225]" src="./img/1.png" data-holder-rendered="true" />
                <div className="card-body">
                  <p className="card-text item-title">Title</p>
                  <p className="card-text item-desc">Description</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <a className="btn btn-sm btn-outline-secondary item-buy" href="/detail">Buy at 0.01ETH</a>
                    </div>
                    <small className="item-ordered-time" className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
