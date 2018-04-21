import React, { Component } from 'react'

export class Publish extends Component {
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
                <input type="text" className="form-control form-title" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Description</span>
                </div>
                <textarea className="form-control" aria-label="Description" placeholder="Description"></textarea>
              </div>
              <br/>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">Price</span>
                </div>
                <input type="text" className="form-control form-title" placeholder="0.1" aria-label="Price" aria-describedby="basic-addon3" />
                <div className="input-group-append">
                  <span className="input-group-text">ETH</span>
                </div>
              </div>
              <button type="button" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
