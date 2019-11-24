import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search'

import { clickSearch } from '../actions/searchActions'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        return (
            <React.Fragment>
                <Grid item>
                    <SearchIcon color="inherit" />
                </Grid>
                <Grid item xs>
                    <TextField
                        fullWidth
                        placeholder="Search by title"
                        onChange={(e) => this.setState({ term: e.target.value })}
                        onKeyPress={(e) => this.keyPress(e)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => this.props.clickSearch(this.state.term)}>
                        Search
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }

    keyPress(e) {
        if (e.key === 'Enter') {
            this.props.clickSearch(this.state.term)
        }
    }
}

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators({ clickSearch }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Search)