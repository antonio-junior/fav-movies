import { bindActionCreators, compose } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Bookmarks from '@material-ui/icons/Bookmarks';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import clickSection from '../actions/sectionActions';

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.categories = [
      {
        id: 'Sections',
        children: [
          { id: 'Search', icon: <LocalMoviesIcon /> },
          { id: 'Favorites', icon: <Bookmarks /> },
          { id: 'Summary', icon: <BuildIcon /> },
        ],
      },
    ];

    const { clickSection: clickSectionCall } = this.props;
    clickSectionCall('Search');
  }

  render() {
    const {
      classes,
      PaperProps,
      sections,
      clickSection: clickSectionCall,
    } = this.props;

    return (
      <Drawer variant="permanent" PaperProps={PaperProps}>
        <List disablePadding>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory,
            )}
          >
            Fav Movies
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Project Overview
            </ListItemText>
          </ListItem>
          {this.categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon }) => {
                const active = sections.actual === childId;
                return (
                  <ListItem
                    onClick={() => clickSectionCall(childId)}
                    key={childId}
                    button
                    className={clsx(
                      classes.item,
                      active && classes.itemActiveItem,
                    )}
                  >
                    <ListItemIcon className={classes.itemIcon}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItem>
                );
              })}

              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  PaperProps: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  clickSection: PropTypes.func.isRequired,
};

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

const mapStateToProps = state => ({ sections: state.sections });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickSection }, dispatch);

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Navigator);
