import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedNumber, FormattedMessage, FormattedDate } from 'react-intl';

import { getFormattedArea } from '../../utils/units';

import Text from '../UI/Text/Text';
import Tiny from '../UI/Text/Tiny';
import IconLink from '../UI/Text/IconLink';
import EmptyState from './EmptyState';
import Download from '../UI/Icons/Download';

class Invoices extends Component {

  componentWillMount() {
    this.props.fetchInvoices();
  }

  render() {
    const {invoices, token} = this.props;

    if (invoices.length <= 0) return <EmptyState/>;

    return (
      <div className="invoices">
        {
          invoices.map(invoice => (
            <ul key={invoice.id} className="invoices__card">

              <li className="invoices__info">
                <Tiny color="green">
                  &#x23;
                  {invoice.id}
                </Tiny>
                <Text>
                  <FormattedDate
                    value={new Date(invoice.issue_date)}
                    year="numeric"
                    month="numeric"
                    day="2-digit"
                  />
                </Text>
              </li>

              <li className="invoices__info">
                <Tiny color="light">
                  <FormattedMessage
                    id={'ForestData.area'}
                  />
                </Tiny>
                <Text>
                  <FormattedNumber
                    value={getFormattedArea(Number(invoice.sqm)).value.toFixed(2)}
                  /> {getFormattedArea(invoice.sqm).unit}
                </Text>
              </li>

              <li className="invoices__info">
                <Tiny color="light">
                  <FormattedMessage
                    id={'invoices.forest'}
                    defaultMessage={'Forest'}
                  />
                </Tiny>
                <Text>
                  {invoice.forest_name}
                </Text>
              </li>

              <li className="invoices__info">
                <Tiny color="light">
                  <FormattedMessage
                    id={'ForestData.price'}
                  />
                </Tiny>
                <Text>
                  <FormattedNumber
                    value={Number(invoice.total_amount)}
                    style="currency" // eslint-disable-line
                    currency="EUR"
                    currencyDisplay="symbol"
                  />
                </Text>
              </li>

              <li className="invoices__info">
                <IconLink
                  href={`${invoice.download_url}?access-token=${token}`}
                  download
                  icon={Download}>
                  <Text color="light">
                    <FormattedMessage
                      id={'invoices.download'}
                      defaultMessage={'Download'}
                    />
                  </Text>
                </IconLink>
              </li>

            </ul>
          ))
        }
      </div>
    );
  }
}


Invoices.propTypes = {
  fetchInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.Number,
    issue_date: PropTypes.string,
    forest_name: PropTypes.string,
    download_url: PropTypes.string,
    total_amount: PropTypes.string,
    sqm: PropTypes.number,
  })).isRequired,
  token: PropTypes.string.isRequired,
};

export default Invoices;
