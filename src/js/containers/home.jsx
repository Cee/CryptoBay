import React, { Component } from 'react'

export class Home extends Component {
  render() {
    return (
      <section className="text-center">
        <div className="container main-section">
          <h1 className="heading">The marketplace for cryptogoods</h1>
          <p className="lead text-muted">Buy, sell, and discover digital items</p>
          <p>
            <a href="/store" className="btn btn-primary my-2">Explore ></a>
          </p>
        </div>
      </section>
    )
  }
}
