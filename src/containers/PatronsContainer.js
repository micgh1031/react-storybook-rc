import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchForestPatrons } from '../actions/forests';
import * as selector from '../selectors/forests';
import { getUserDetails } from '../selectors/userSession';

import Patrons from '../components/Forests/Patrons/Patrons';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

class PatronsContainer extends Component {
  constructor() {
    super();

    this.pageLength = 5;
  }

  componentWillMount() {
    const { fetchForestPatrons, forestId, page } = this.props;

    fetchForestPatrons(forestId, page, this.pageLength);
  }

  render() {
    const {
      data,
      errorMessages,
      fetchForestPatrons,
      forestId,
      isFetching,
      page,
      patrons,
      podium,
      user,
    } = this.props;

    if (errorMessages) {
      return (
        <FullErrorFetching
          errorMessage={errorMessages}
          retry={fetchForestPatrons.bind(this, forestId, page, this.pageLength)}
        />
      );
    }

    if (isFetching && Object.keys(patrons).length <= 0) return <Loader />;

    return (
      <Patrons
        data={data}
        getMore={fetchForestPatrons.bind(this, forestId)}
        page={page}
        pageLength={this.pageLength}
        patrons={patrons}
        podium={podium}
        user={user}
        isFetching={isFetching}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  data: selector.getPatronsData(state),
  errorMessages: selector.getPatronsErrorMessages(state),
  isFetching: selector.getIsFetchingPatrons(state),
  page: selector.getPatronsPage(state),
  patrons: selector.getPatrons(state),
  podium: selector.getPatronsPodium(state),
  user: getUserDetails(state),
});

PatronsContainer.propTypes = {
  fetchForestPatrons: PropTypes.func.isRequired,
  forestId: PropTypes.number.isRequired,
  data: PropTypes.object,
  errorMessages: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  page: PropTypes.number,
  patrons: PropTypes.array,
  podium: PropTypes.array,
  user: PropTypes.object,
};

export default connect(mapStateToProps, {
  fetchForestPatrons
})(PatronsContainer);
