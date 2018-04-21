import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { getAccounts, getInstance } from '../web3'
import { Header, Loading } from '../components'
import { Home } from './home'
import { Store } from './store'
import { Detail } from './detail'
import { Publish } from './publish'

const history = createBrowserHistory()

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  async componentDidMount() {
    const instance = await getInstance()
    const accounts = await getAccounts()
    this.setState({
      loading: false,
    })
  }
  render() {
    return (
      <div>
        <Header />
        <main role="main">
        { this.state.loading ? (
            <Loading />
          ) : (
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/store" component={Store} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/publish" component={Publish} />
                {/* <Route component={NoMatch}/> */}
              </Switch>
            </Router>
          )
        }
        </main>
      </div>
    )
  }
}
