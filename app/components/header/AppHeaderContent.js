/**
 * AppHeader Menu content
 */

import { remote, ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { autoBind } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'

const styles = {
  iconHover: {
    '&:hover': {
      fill: 'rgb(225, 0, 80)'
    }
  }
}

class AppHeaderContent extends React.Component {
  constructor() {
    super()
    autoBind(['openPackage', 'updateMode', 'toggleSettings'], this)
  }
  updateMode(directory) {
    ipcRenderer.send('analyze-json', directory)
  }
  openPackage(e) {
    e.preventDefault()
    const { handleDrawerClose } = this.props

    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      (filePath) => {
        if (filePath) {
          this.updateMode(filePath[0])
        }
        handleDrawerClose()
      }
    )
  }
  toggleSettings(e) {
    const { handleSettingsOpen } = this.props
    handleSettingsOpen(true)
  }
  render() {
    const { classes } = this.props

    return (
      <section>
        <List>
          <ListItem button onClick={this.openPackage}>
            <ListItemIcon>
              <Icon className={classes.iconHover}>archive</Icon>
            </ListItemIcon>
            <ListItemText primary="Analyze" secondary="local repository" />
          </ListItem>
          <ListItem button onClick={this.toggleSettings}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" secondary="application settings" />
          </ListItem>
        </List>
      </section>
    )
  }
}

const { object } = PropTypes

AppHeaderContent.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(AppHeaderContent)
