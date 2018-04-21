import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { Header } from '../components'
import { Home } from './home'
import { Store } from './store'
import { Detail } from './detail'
import { Publish } from './publish'

const history = createBrowserHistory()

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main role="main">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/detail" component={Detail} />
            <Route path="/publish" component={Publish} />
            {/* <Route component={NoMatch}/> */}
          </Switch>
        </Router>
        </main>
      </div>
    )
  }
}
