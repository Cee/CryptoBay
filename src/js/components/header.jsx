import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>CryptoBay</strong>
            </a>
            <a className="btn btn-outline-warning" href="/publish">Publish</a>
          </div>
        </div>
      </header>
    )
  }
}
