import React, { Component } from 'react'

export class Detail extends Component {
  render() {
    return (
      <div id="detail" className="py-5 bg-light">
        <div className="container">
          <h1>Detail</h1>
          <br/>
          <div className="row">
            <div className="col-md-4">
              <img className="card-img-top" alt="Thumbnail [100%x225]" src="./img/1.png" data-holder-rendered="true" />
            </div>
            <div className="col-md-8">
              <p className="card-text item-title">Title</p>
              <p className="card-text item-desc">Description</p>
              <p className="card-text item-owner">Owned by: <a href="#">Somebody</a></p>
              <a className="btn btn-sm btn-outline-secondary item-buy" href="/detail">Buy at 0.01ETH</a>&nbsp;
              <small className="item-ordered-time" className="text-muted">Published: 9 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
