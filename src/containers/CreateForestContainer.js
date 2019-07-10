import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchForests } from '../actions/forests';
import { getSources } from '../actions/carbon';
import { getBalance } from '../actions/balance';
import { updateLoadStatus } from '../actions/UI';
import { addSource } from '../actions/carbon';

import {
  getForests,
  getIsFetching as getIsFetchingForests,
  getErrorMessages as getForestsErrorMessages
} from '../selectors/forests';
import {
  getSourcesToOffset,
  getIsFetching as getIsFetchingSources,
  getErrorMessages as getSourcesErrorMessages,
  getIsAdding as getIsAddingSource
} from '../selectors/carbon';
import {
  getCaptured,
  getEmitted,
  getOxygen,
  getIsFetching as getIsFetchingBalance,
  getErrorMessages as getBalanceErrorMessages
} from '../selectors/balance';
import { REDIRECT_MIN_LOADER_TIME } from '../constants/app';

import Create from '../components/Forests/Create/Create';
import LoaderRedirect from '../components/UI/Loader/LoaderRedirect';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

import {
  getCalculatedPrice
} from '../actions/checkout';

class CreateForestContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      area: 0,
      budget: 0,
      carbon: 0,
      selectedSources: [],
      forestDetailsId: null,
      loading: false,
      timeFinished: false
    };

    this.setCurrentItemCheck = this.setCurrentItemCheck.bind(this);
  }

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Create forest",
      "Mode": this.mode,
      "Domain": "App"
    });
  }

  componentWillMount() {
    const {
      history,
      match: { params: { mode } },
      addSource,
      isAddingSource,
      isFetchingForests,
      isFetchingSources,
      isFetchingBalance,
      forests
    } = this.props;

    let self = this;

    if (mode !== 'area' && mode !== 'budget' && mode !== 'carbon') {
      history.replace('/create-forest/carbon');
    }

    if (this.props.match.params.mode === 'redirect') {
      self.setState({loading: 'true'});
      this.props.updateLoadStatus('loading');
      let path = [];

      let data = this.props.location.search;
      data = data.replace('?', '');
      data = data.split('&');
      let type = data[0].replace('utm_source=', '');
      let weight = parseInt(data[1].replace('utm_carbon=', ''));
      let name = data[2].replace('utm_source_name=', '');
      name = name.split('%20').join(' ');
      name = name.split('-').join(' ');
      let load_time = REDIRECT_MIN_LOADER_TIME;

      addSource(
        weight,
        name,
        1,
        path,
        type,
        'redirect'
      );

      setTimeout(() => {
        if(!isAddingSource) {
          this.fetch();
        }
      }, load_time/2);


      setTimeout(() => {
        self.setState({timeFinished: true});
        if(
          !isFetchingForests &&
          !isFetchingSources &&
          !isFetchingBalance &&
          forests.length > 0
        ){
          self.setState({loading: false});
          self.setCurrentItemCheck();
        }

      }, load_time);
    }else {
      this.fetch();
    }
  }

  fetch() {
    const {
      fetchForests,
      getSources,
      getBalance,
    } = this.props;

    fetchForests();
    getSources();
    getBalance();
  }

  setCurrentItemCheck() {
    let source = localStorage.getItem("current_source");

    if(source) {
      let data = JSON.parse(source);
      this.setState({
        carbon: Number(data.amount),
        selectedSources: [ data.id ]
      });
      
    }
    localStorage.setItem("current_source", '');
  }

  isPaymentPossible(forest, area) {

    mixpanel.track("Checkout", {
      "Action": "Pre-order",
      "Domain": "App"
    });

    this.props.getCalculatedPrice(forest, area);
  }

  openForestDetails(id) {
    this.setState({ forestDetailsId: id });
  }

  closeForestDetails() {
    this.setState({ forestDetailsId: null });
  }

  handleChange(value, key) {
    this.setState({
      [key]: (isNaN(value) || value.length > 6) ?
        this.state[key]
        : Number(value)
    });
  }

  handleSelect(element, id) {
    const { checked, value } = element.target;
    const { carbon, selectedSources } = this.state;

    this.setState({
      carbon: checked ?
        carbon + Number(value)
        : (carbon - Number(value) < 0) ?
        0
        : carbon - Number(value),
      selectedSources: checked ?
        [ ...selectedSources, id ]
        : selectedSources.filter(stateId => stateId !== id )
    });
  }

  getData(price, carbonIn25Years) {
    const { match: { params: { mode } } } = this.props;
    const { area, budget, carbon, selectedSources } = this.state;

    switch (mode) {
      case 'area':
        return {
          price: area * price,
          area: area,
          carbon: carbonIn25Years * area
        };
      case 'budget':
        return {
          price: budget,
          area: budget / price,
          carbon: carbonIn25Years * (budget / price)
        };
      default:
        return {
          price: (carbon / carbonIn25Years) * price,
          area: carbon / carbonIn25Years,
          carbon: carbon,
          selectedSources: selectedSources
        };
    }
  }

  render() {
    const {
      forests,
      match: { params: { mode } },
      sources,
      isFetchingForests,
      isFetchingSources,
      isFetchingBalance,
      forestsErrorMessages,
      sourcesErrorMessages,
      balanceErrorMessages,
      emitted,
      oxygen,
      captured,
    } = this.props;

    const { loading, timeFinished } = this.state;

    if (
      forestsErrorMessages ||
      sourcesErrorMessages ||
      balanceErrorMessages
    ) {
      return (
        <FullErrorFetching
          errorMessage={
            forestsErrorMessages ||
            sourcesErrorMessages ||
            balanceErrorMessages
          }
          retry={this.fetch.bind(this)}
        />
      );
    }

    if (loading) {
      if(
        timeFinished &&
        !isFetchingForests &&
        !isFetchingSources &&
        !isFetchingBalance &&
        forests.length > 0
      ){
        this.setState({loading: false});
        this.setCurrentItemCheck();
      }
      return <LoaderRedirect />;
    }
    else {
      if(
        isFetchingForests ||
        isFetchingSources ||
        isFetchingBalance ||
        forests.length <= 0 ||
        !mode
      ){
        return <Loader />;
      }
      else {
        this.props.updateLoadStatus('active');

        return (
          <Create
            closeForestDetails={this.closeForestDetails.bind(this)}
            forestDetailsId={this.state.forestDetailsId}
            forests={forests}
            getData={this.getData.bind(this)}
            handleChange={this.handleChange.bind(this)}
            handleSelect={this.handleSelect.bind(this)}
            mode={mode}
            openForestDetails={this.openForestDetails.bind(this)}
            selectedSources={this.state.selectedSources}
            sources={sources}
            values={{
              area: this.state.area,
              budget: this.state.budget,
              carbon: this.state.carbon,
            }}
            emitted={emitted}
            oxygen={oxygen}
            captured={captured}
            isPaymentPossible={this.isPaymentPossible.bind(this)}
          />
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  forests: getForests(state),
  sources: getSourcesToOffset(state, getCaptured(state)),
  isFetchingForests: getIsFetchingForests(state),
  isFetchingSources: getIsFetchingSources(state),
  isFetchingBalance: getIsFetchingBalance(state),
  isAddingSource: getIsAddingSource(state),
  forestsErrorMessages: getForestsErrorMessages(state),
  sourcesErrorMessages: getSourcesErrorMessages(state),
  balanceErrorMessages: getBalanceErrorMessages(state),
  emitted: getEmitted(state),
  oxygen: getOxygen(state),
  captured: getCaptured(state),
});

CreateForestContainer.propTypes = {
  fetchForests: PropTypes.func.isRequired,
  forests: PropTypes.array,
  getBalance: PropTypes.func.isRequired,
  addSource: PropTypes.func.isRequired,
  getSources: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  sources: PropTypes.array,
  isFetchingForests: PropTypes.bool.isRequired,
  isFetchingSources: PropTypes.bool.isRequired,
  isFetchingBalance: PropTypes.bool.isRequired,
  forestsErrorMessages: PropTypes.string,
  sourcesErrorMessages: PropTypes.string,
  balanceErrorMessages: PropTypes.string,
  emitted: PropTypes.number.isRequired,
  oxygen: PropTypes.number.isRequired,
  captured: PropTypes.number.isRequired,
  getCalculatedPrice: PropTypes.func.isRequired,
  //updateLoadStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchForests,
  getBalance,
  addSource,
  getSources,
  getCalculatedPrice,
  updateLoadStatus,
})(CreateForestContainer);
