import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import { FormattedMessage } from 'react-intl';

import Text from '../UI/Text/Text';
import HeadingSmall from '../UI/Text/HeadingSmall';
import ForestData from '../Forests/Create/ForestData';
import Button from '../UI/Button/Button';
import EmptyState from './EmptyState';

import './Certificates.css';

class Certificates extends Component {

  componentWillMount() {
    this.props.fetchCertificates();
  }

  render() {
    const {certificates, token} = this.props;

    if (certificates.length <= 0) return <EmptyState type="certificates"/>;

    return (
      <ul className="certificates">
        {
          certificates.map(certificate => (
            <li key={certificate.id} className="certificates__item">
              <Box
                className="certificates__image"
                style={{
                  backgroundImage: `url(${certificate.main_image})`
                }}
              />
              <Box column className="certificates__info">
                <div className="certificates__title">
                  <HeadingSmall className="create-forest-item__name">
                    {certificate.name}
                  </HeadingSmall>
                  <Text color="light">
                    {certificate.location_desc}
                  </Text>
                </div>
                <ForestData
                className="create-forest-item__data"
                data={{
                  price: null,
                  area: +certificate.user_total_surface,
                  carbon: certificate.captured_co2,
                }}
                />
                <a
                  href={`${certificate.download_url}?access-token=${token}`}
                  download>
                    <Button>
                      <FormattedMessage
                        id={'invoices.download'}
                      />
                    </Button>
                </a>
              </Box>
            </li>
          ))
        }
      </ul>
    );
  }
}

Certificates.propTypes = {
  fetchCertificates: PropTypes.func.isRequired,
  certificates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    location_desc: PropTypes.string,
    main_image: PropTypes.string,
    download_url: PropTypes.string,
    name: PropTypes.string,
  })),
  token: PropTypes.string.isRequired,
};

export default Certificates;
