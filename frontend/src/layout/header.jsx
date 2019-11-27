/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class Header extends Component {
  render() {
    const { classes, onDrawerToggle, sections } = this.props;

    return (
      <>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                >
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {sections.actual}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        />
      </>
    );
  }
}

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  sections: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ sections: state.sections });

const enhance = compose(withStyles(styles), connect(mapStateToProps, null));

export default enhance(Header);
