import React, { Component } from 'react'

export class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      children: this.props.children,
    }
  }
  show(title, children) {
    this.setState({
      title,
      children,
    }, () => {
      $('#' + this.props.id).modal('show')
    })
  }
  hide() {
    $('#' + this.props.id).modal('hide')
  }
  componentWillUnmount() {
    $('#' + this.props.id).modal('hide')
  }
  render() {
    const { id } = this.props
    const { title, children } = this.state
    return (
      <div className="modal" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}-title`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${id}-title`}>{ title }</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { children }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
