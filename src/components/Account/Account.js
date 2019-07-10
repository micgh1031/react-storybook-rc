import React from 'react';
import PropTypes from 'prop-types';
import Box from 'react-layout-components';
import { TabList, Tab, TabPanel } from 'react-tabs';
import { FormattedMessage } from 'react-intl';

import CoverImage from '../Layout/CoverImage/CoverImage';
import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import Tabbed from '../UI/Tabs/Tabbed';
import Settings from './Settings';
import Password from './Password';
import Invoices from './Invoices';
import Certificates from './Certificates';

import './Account.css';
import welcomeImg from '../../assets/images/welcome.jpg';

const Account = ({
  countries,
  isUpdating,
  languages,
  passwordErrorMessages,
  refreshProfile,
  setNewPassword,
  updateErrorMessages,
  updateAvatar,
  updateUser,
  user,
  privacy,
  invoices,
  token,
  invoicesErrorMessages,
  certificates,
  fetchInvoices,
  fetchCertificates,
  uploadProgress,
  addAlert,
}) => {

  if (countries.length < 1) {
    return false;
  }

  const { ...initialValues } = user;

  const humanReadableCountryName = () => {
    if (!initialValues.country) {
      return '';
    }
    const initialCountry = countries.find(
      (element) => initialValues.country.toUpperCase() === element.country_code
    );
    return initialCountry.country_name;
  };

  return (
    <Box width="100%" className="account">

      <CoverImage img={welcomeImg} />

      <Container>
        <Content className="account__settings">

          <Tabbed>
            <TabList>
              <Tab>
                <FormattedMessage
                  id={'Account.settingsTab'}
                  defaultMessage={'Personal Information'}
                />
              </Tab>
              <Tab>
                <FormattedMessage
                  id={'Account.passwordTab'}
                  defaultMessage={'Change Password'}
                />
              </Tab>
              <Tab>
                <FormattedMessage
                  id={'Account.invoicesTab'}
                  defaultMessage={'Invoices'}
                />
              </Tab>
              <Tab>
                <FormattedMessage
                  id={'Account.certificates'}
                  defaultMessage={'Certificates'}
                />
              </Tab>
            </TabList>

            <TabPanel>
              <Settings
                avatar={user.avatar_url}
                countries={countries}
                initialValues={{...initialValues, country: humanReadableCountryName() }}
                isUpdating={isUpdating}
                languages={languages}
                refreshProfile={refreshProfile}
                updateErrorMessages={updateErrorMessages}
                updateAvatar={updateAvatar}
                updateUser={updateUser}
                privacy={privacy}
                uploadProgress={uploadProgress}
                addAlert={addAlert}
              />
            </TabPanel>

            <TabPanel>
              <Password
                isUpdating={isUpdating}
                setNewPassword={setNewPassword}
                passwordErrorMessages={passwordErrorMessages}
              />
            </TabPanel>

            <TabPanel>
              <Invoices
                fetchInvoices={fetchInvoices}
                invoices={invoices}
                token={token}
                invoicesErrorMessages={invoicesErrorMessages}
              />
            </TabPanel>

            <TabPanel>
              <Certificates
                fetchCertificates={fetchCertificates}
                certificates={certificates}
                token={token}/>
            </TabPanel>
          </Tabbed>

        </Content>
      </Container>

    </Box>
  );
};

Account.propTypes = {
  countries: PropTypes.array.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  languages: PropTypes.array.isRequired,
  passwordErrorMessages: PropTypes.string,
  refreshProfile: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  fetchInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array.isRequired,
  invoicesErrorMessages: PropTypes.string,
  token: PropTypes.string.isRequired,
  fetchCertificates: PropTypes.func.isRequired,
  certificates: PropTypes.array.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  addAlert: PropTypes.func.isRequired,
};

export default Account;
