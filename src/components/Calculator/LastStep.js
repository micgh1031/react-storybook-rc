import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import { carbonMessages } from '../../constants/messages';
import { hideSidebar, showSidebar } from '../../constants/customEvents';

import LineInput from '../UI/Forms/LineInput';

class LastStep extends Component {
  render() {
    return (
      <Field
        className={cx(this.props.className, 'carbon-calc-step')}
        name="field_last"
        component={LineInput}
        type="text"
        color="orange"
        placeholder={this.props.intl.formatMessage(
          carbonMessages.calculatorLastStepPlaceholder
        )}
        textBefore={this.props.intl.formatMessage(
          carbonMessages.calculatorLastStepBefore
        )}
        textAfter={window.innerWidth > 768 ? "." : ""}
        onFocus={() => dispatchEvent(hideSidebar)}
        onBlur={() => dispatchEvent(showSidebar)}
      />
    );
  }
}

LastStep.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(LastStep);
