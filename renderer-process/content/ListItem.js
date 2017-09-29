'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    ipcRenderer.send('view-by-version', this.props.name, this.props.version);
    return false;
  }
  render() {
    return (
      <a href="#" className="list-group-item" onClick={this.onItemClick} ref={`root-${this.props.idx}`}>
        {this.props.name}
        <span className={`badge badge-green`}>
          v{this.props.version}
        </span>
      </a>
    )
  }
}