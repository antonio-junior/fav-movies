import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import clickSearch from '../actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  keyPress(e) {
    if (e.key === 'Enter') {
      const { term } = this.state;
      const { clickSearch: clickSearchCall } = this.props;
      clickSearchCall(term);
    }
  }

  render() {
    const { sections, clickSearch: clickSearchCall } = this.props;
    const { term } = this.state;
    const isSearchSection = sections.actual === 'Search';

    return (
      isSearchSection && (
        <>
          <Grid item>
            <SearchIcon color="inherit" />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Search by title"
              onChange={e => this.setState({ term: e.target.value })}
              onKeyPress={e => this.keyPress(e)}
              value={term}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => clickSearchCall(term)}>
              Search
            </Button>
          </Grid>
        </>
      )
    );
  }
}

Search.propTypes = {
  clickSearch: PropTypes.func.isRequired,
  sections: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sections: state.sections,
  search: state.search,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Search);
