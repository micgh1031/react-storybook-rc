import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  forestSummary,
} from '../actions/forests';
import {
  getErrorMessages,
  getFilter,
  getFilteredSources,
  getIsAdding,
  getIsFetching,
  getIsRemoving,
  getIsUpdating,
  getTotalCarbon,
} from '../selectors/carbon';
import {
  getMyForests,
  getIsFetching as getIsFetchingForests
} from '../selectors/forests';

import { getIsUserAuthenticated } from '../selectors/userSession';

import {
  addSource,
  getSources,
  removeSource,
  setCarbonFilter,
  updateSourceFrequency,
} from '../actions/carbon';

import CarbonSidebar from '../components/Carbon/CarbonSidebar';

class CarbonSidebarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlySelected: null,
      searchOpen: false,
    };
  }

  componentWillMount() {
    this.fetchSources();
    if (this.props.dashboard) {
      this.fetchForests();
    }
  }

  fetchSources() {
    this.props.getSources();
  }

  fetchForests() {
    this.props.forestSummary();
  }

  setFilter(event) {
    this.props.setCarbonFilter(event.target.value);
  }

  toggleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  selectItem(id = null) {
    this.setState({ currentlySelected: id });
  }

  deleteItem(id) {
    this.props.removeSource(id);
  }

  updateFrequency(frequency = '0') {
    this.props.updateSourceFrequency(frequency);
  }

  render() {
    const {
      errorMessages,
      filter,
      isAdding,
      isFetching,
      isRemoving,
      isUpdating,
      sources,
      totalCarbon,
      dashboard,
      isFetchingForests,
      forests,
    } = this.props;

    return (
      <CarbonSidebar
        currentlySelected={this.state.currentlySelected}
        deleteItem={this.deleteItem.bind(this)}
        errorMessages={errorMessages}
        fetchSources={this.fetchSources.bind(this)}
        filter={filter}
        isAdding={isAdding}
        isFetching={isFetching}
        isRemoving={isRemoving}
        isSearchOpen={this.state.searchOpen}
        isUpdating={isUpdating}
        selectItem={this.selectItem.bind(this)}
        setFilter={this.setFilter.bind(this)}
        sources={sources}
        toggleSearch={this.toggleSearch.bind(this)}
        totalCarbon={totalCarbon}
        updateFrequency={this.updateFrequency.bind(this)}
        dashboard={dashboard}
        isFetchingForests={isFetchingForests}
        forests={forests}
      />
    );
  }
}

CarbonSidebarContainer.propTypes = {
  errorMessages: PropTypes.string,
  filter: PropTypes.string,
  getSources: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRemoving: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  removeSource: PropTypes.func.isRequired,
  setCarbonFilter: PropTypes.func.isRequired,
  sources: PropTypes.array,
  totalCarbon: PropTypes.number.isRequired,
  updateSourceFrequency: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dashboard: PropTypes.bool,
  forestSummary: PropTypes.func.isRequired,
  isFetchingForests: PropTypes.bool.isRequired,
  forests: PropTypes.array,
};

const mapStateToProps = state => ({
  errorMessages: getErrorMessages(state),
  filter: getFilter(state),
  isAdding: getIsAdding(state),
  isFetching: getIsFetching(state),
  isRemoving: getIsRemoving(state),
  isUpdating: getIsUpdating(state),
  sources: getFilteredSources(state, getFilter(state)),
  totalCarbon: getTotalCarbon(state),
  isAuthenticated: getIsUserAuthenticated(state),
  isFetchingForests: getIsFetchingForests(state),
  forests: getMyForests(state),
});

export default connect(mapStateToProps, {
  addSource,
  getFilteredSources,
  getSources,
  removeSource,
  setCarbonFilter,
  updateSourceFrequency,
  forestSummary,
})(CarbonSidebarContainer);
