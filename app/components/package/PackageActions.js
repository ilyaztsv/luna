/**
 * PackageActions component
 */

import { withStyles } from 'material-ui/styles'
import { APP_MODES } from 'constants/AppConstants'
import { firstToUpper } from 'utils'
import Card, { CardContent } from 'material-ui/Card'
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import CardVersions from './CardVersions'
import CardOptions from './CardOptions'
import CardTags from './CardTags'
import Statslist from './Statslist'
import Divider from 'material-ui/Divider'

const grayColor = '#999999'
const { object, array, func, string } = PropTypes

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      placeContent: 'space-around start'
    },
    margin: {
      marginBottom: theme.spacing.unit + 10
    },
    marginTop: {
      marginTop: theme.spacing.unit
    },
    heading: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '1.1rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    controls: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: theme.spacing.unit,
      '& fieldset': {
        margin: theme.spacing.unit
      }
    },
    details: {
      marginBottom: 10
    },
    icon: {
      margin: theme.spacing.unit
    },
    info: {
      lineHeight: '22px',
      color: grayColor,
      fontSize: '12px',
      display: 'inline-block',
      margin: '0!important'
    }
  }
}

class PackageActions extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      active,
      addCommandOption,
      classes,
      cmdOptions,
      group,
      mode,
      version,
      packageJSON,
      removeCommandOption,
      onChangeVersion,
      setVersion,
      settings,
      toggleMainLoader
    } = this.props

    const { license } = active

    return (
      <section className={classes.root}>
        {group && (
          <Card className={classnames(classes.card, classes.margin)}>
            <CardContent>
              <Typography
                component="h3"
                className={classes.heading}
                variant="subheading"
              >
                Group
              </Typography>
              <Divider />
              <Typography veriant="display1" className={classes.marginTop}>
                {firstToUpper(group)}
              </Typography>
            </CardContent>
          </Card>
        )}
        {license && (
          <Card className={classnames(classes.card, classes.margin)}>
            <CardContent>
              <Typography
                component="h3"
                className={classes.heading}
                variant="subheading"
              >
                License
              </Typography>
              <Divider />
              <Typography veriant="display1" className={classes.marginTop}>
                {typeof license === 'string' && license}
                {typeof license === 'object' && license.type}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Card className={classnames(classes.card, classes.margin)}>
          <CardContent>
            <Typography
              component="h3"
              className={classes.heading}
              variant="subheading"
            >
              Versions and options
            </Typography>
            <Divider />
            <section className={classes.controls}>
              <CardVersions
                active={active}
                version={version}
                onChangeVersion={onChangeVersion}
                setVersion={setVersion}
              />
              {mode && mode === APP_MODES.LOCAL ? (
                <CardOptions
                  active={active}
                  addCommandOption={addCommandOption}
                  group={group}
                  version={version}
                  cmdOptions={cmdOptions}
                  packageJSON={packageJSON}
                  removeCommandOption={removeCommandOption}
                />
              ) : null}
            </section>
          </CardContent>
        </Card>
        <Card className={classnames(classes.card, classes.margin)}>
          <CardContent>
            <Typography
              component="h3"
              className={classes.heading}
              variant="subheading"
              >
              Dist tags
            </Typography>
            <Divider />
            <CardTags active={active} toggleMainLoader={toggleMainLoader}/>
          </CardContent>
        </Card>
        {settings && settings.fetchGithub === true && active.stats ? (
          <Card className={classnames(classes.card, classes.margin)}>
            <CardContent>
              <Typography
                component="h3"
                className={classes.heading}
                variant="subheading"
              >
                Github stats
              </Typography>
              <Divider />
              <Statslist stats={active.stats} />
            </CardContent>
          </Card>
        ) : null}
      </section>
    )
  }
}

export default withStyles(styles)(PackageActions)
