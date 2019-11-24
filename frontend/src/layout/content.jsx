import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MainContent from './mainContent'
import Search from '../components/search'
import consts from '../consts'

class Content extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const section = this.props.sections.actual;
    const url = section === 'Search' 
      ? `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=/${this.props.search.term}`
      : `${consts.FAV_MOVIES_URL}/favmovies`

    return (
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Search />
            </Grid>
          </Toolbar>
        </AppBar>
        <MainContent url={url} />
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
});

const mapStateToProps = state => ({ search: state.search, sections: state.sections })

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null)
);

export default enhance(Content);