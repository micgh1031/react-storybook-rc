import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import AlertsProvider from '../containers/AlertsProvider';
import GalleryProvider from '../containers/GalleryProvider';

import { messages } from './messages';
import history from './history';

import { getToken, getUserDetails } from '../selectors/userSession';
import { getKsDetails } from '../selectors/ksUser';
import { refreshToken, startRefreshInterval, guestAuthenticate } from '../actions/userSession';
import { getIsWorking, getGuestErrorMessages } from '../selectors/userActions';

import routes from './routes';
import Frame from '../components/Layout/Frame/Frame';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

class Root extends Component {

  constructor(props){
    super(props);

    this.state = {
      language: this.getCurrentLang(props.store.getState()),
    };

    this.guestAuth = this.guestAuth.bind(this);
    this.getCurrentLang = this.getCurrentLang.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    props.store.subscribe(this.handleLangChange);
  }

  componentWillMount(){
    this.guestAuth(this.props.token);
    this.props.store.dispatch(refreshToken());
    this.props.store.dispatch(startRefreshInterval());
  }

  componentWillReceiveProps(newProps){
    if (!newProps.isWorking && !newProps.token) {
      this.guestAuth(newProps.token);
      history.push('/login');
    }
  }

  guestAuth(token) {
    if (!token) {
      this.props.store.dispatch(guestAuthenticate());
    }
  }

  getCurrentLang(state) {
    const ksLang = getKsDetails(state) && getKsDetails(state).lang;
    if(ksLang) return ksLang;

    return getUserDetails(state).lang;
  }

  handleLangChange() {
    let previousLang = this.state.language;
    let currentLang = this.getCurrentLang(this.props.store.getState());

    if (previousLang !== currentLang) {
      this.setState({
        language: currentLang
      });
    }
  }

  render() {
    const {
      guestError,
      isWorking,
      store,
      token,
    } = this.props;

    if (!token || isWorking) {
      return (
        <Frame>
          <Loader />
        </Frame>
      );
    }

    return (
      <IntlProvider
        locale={this.state.language || navigator.language}
        messages={messages((this.state.language || navigator.language))}>
        <Provider store={store}>
          <AlertsProvider>
            <Router history={history}>
              <div>
                {
                  guestError &&
                  <Frame>
                    <FullErrorFetching
                      retry={this.guestAuth(token)}
                      errorMessage={guestError}
                    />
                  </Frame>
                }
                <GalleryProvider/>
                {routes}
              </div>
            </Router>
          </AlertsProvider>
        </Provider>
      </IntlProvider>
    );
  }

}

const mapStateToProps = state => ({
  guestError: getGuestErrorMessages(state),
  isWorking: getIsWorking(state),
  token: getToken(state),
});

Root.propTypes = {
  guestError: Proptypes.string,
  isWorking: Proptypes.bool.isRequired,
  store: Proptypes.object.isRequired,
  token: Proptypes.string,
};

export default connect(mapStateToProps)(Root);
