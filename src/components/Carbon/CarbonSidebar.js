import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { TabList, Tab, TabPanel } from 'react-tabs';
import { FormattedNumber, FormattedMessage } from 'react-intl';

import Sidebar from '../Layout/Sidebar/Sidebar';
import Content from '../Layout/Container/Content';
import Bottom from '../Layout/Container/Bottom';

import CarbonSearch from './CarbonSearch';
import EmptyCarbon from './EmptyCarbon';
import CarbonList from './CarbonList';
import ForestList from './ForestList';
import ErrorFetching from '../UI/Interface/ErrorFetching';
import CarbonItemLoading from './CarbonItemLoading';
import HeadingSmall from '../UI/Text/HeadingSmall';
import Uppercase from '../UI/Text/Uppercase';
import Text from '../UI/Text/Text';
import ButtonLink from '../UI/Button/ButtonLink';
import DisabledButton from '../UI/Button/DisabledButton';
import SearchIcon from '../UI/Icons/Search';
import Tabbed from '../UI/Tabs/Tabbed';
import Token from '../UI/Text/Token';
import IconText from '../UI/Text/IconText';
import OrangePlus from '../UI/Icons/OrangePlus';
import GreenPlus from '../UI/Icons/GreenPlus';
import SidebarToggle from '../UI/SidebarToggle/SidebarToggle';

import { getFormattedWeight } from '../../utils/units';

import './CarbonSidebar.css';

const CarbonSidebar = ({
  className,
  currentlySelected,
  deleteItem,
  errorMessages,
  fetchSources,
  filter,
  isAdding,
  isFetching,
  isRemoving,
  isSearchOpen,
  isUpdating,
  selectItem,
  setFilter,
  sources,
  toggleSearch,
  totalCarbon,
  updateFrequency,
  isFetchingForests,
  forests,
  dashboard,
}) => {
  return (
    <Sidebar
      className={cx(
        className,
        { 'pointer-disabled':
          isAdding || isFetching || isRemoving || isUpdating
        }
      )}
      style={{opacity: isRemoving || isUpdating ? 0.5 : 1}}>

      { dashboard &&
        <Box
          center
          justifyContent="space-between"
          className="carbon-sidebar__dashboard-header">
          <HeadingSmall>
            <FormattedMessage
              id={'Dashboard.overview'}
              defaultMessage={'Overview'}
            />
          </HeadingSmall>
          <SidebarToggle/>
        </Box>
      }

      <Content className="carbon-sidebar__main">

        {dashboard &&
          <Box column>
            <Box
              center
              justifyContent="space-between"
              className="carbon-sidebar__title">

              <HeadingSmall>
                <Token
                  big={true}
                  content={forests.length.toString()}
                  color="green">
                  <FormattedMessage
                    id={'ForestSidebar.title'}
                    defaultMessage={'My Forests'}
                  />
                </Token>
              </HeadingSmall>
            </Box>

            <div className="carbon-sidebar__content">
              {isFetchingForests && forests.length <= 0 ?
                <Box column>
                  <CarbonItemLoading />
                  <CarbonItemLoading />
                </Box>
                :
                <ForestList
                forests={forests}/>
              }
              <Link to="/create-forest" className="carbon-sidebar__add">
                <IconText icon={GreenPlus}>
                    <Text color="green">
                      {forests.length>0 ?
                      <FormattedMessage
                        id={'ForestSources.extend'}
                        defaultMessage={'Extend Forest'}
                      />
                      :
                      <FormattedMessage
                        id={'ForestSources.create'}
                        defaultMessage={'Create Forest'}
                      />
                      }
                    </Text>
                </IconText>
              </Link>
            </div>

          </Box>

        }

        {dashboard &&
          <hr className="carbon-sidebar__divider"/>
        }

        <Box
          center
          justifyContent="space-between"
          className="carbon-sidebar__title">

          <HeadingSmall>
            {dashboard ?
              <Token
                big={true}
                content={sources.length.toString()}
                color="red">
                <FormattedMessage
                  id={'CarbonSidebar.title'}
                  defaultMessage={'My CO² sources'}
                />
              </Token>
              :
              <FormattedMessage
                id={'CarbonSidebar.title'}
                defaultMessage={'My CO² sources'}
              />
            }
          </HeadingSmall>

          {!dashboard && sources.length > 0 &&
            <Box
              className={cx(
                'carbon-sidebar__search',
                { 'carbon-sidebar__search--active': isSearchOpen }
              )}
              center
              onClick={toggleSearch}>
              <SearchIcon />
            </Box>
          }

          {!dashboard &&
            <SidebarToggle/>
          }

          {!dashboard &&
            <Box column className="carbon-sidebar__total">
              <Uppercase
                color="light">
                <FormattedMessage
                  id={'CarbonSidebar.total'}
                  defaultMessage={'Total CO² Emitted'}
                />
              </Uppercase>
              <Text color="orange">
                <FormattedNumber
                  value={getFormattedWeight(totalCarbon).value}
                /> {getFormattedWeight(totalCarbon).unit}
              </Text>
            </Box>
          }
        </Box>

        {
          isSearchOpen &&
          <CarbonSearch
            setFilter={setFilter}
            placeholder="Search sources"
            filter={filter}
          />
        }

        <div className="carbon-sidebar__content">
          { isFetching && sources.length <= 0 ?
            <Box column>
              <CarbonItemLoading />
              <CarbonItemLoading />
              <CarbonItemLoading />
            </Box>
            :
            sources.length <= 0 ? <EmptyCarbon/> :
            <Tabbed theme="carbon">
              <TabList>
                <Tab>
                  <Token
                    content={sources.filter((el) => !el.offsetted && el.periodicity < 1).length.toString()}
                    color="red">
                    <FormattedMessage
                      id={'Carbon.notOffset'}
                    />
                  </Token>
                </Tab>
                <Tab>
                  <Token
                    content={sources.filter((el) => el.offsetted && el.periodicity < 1).length.toString()}
                    color="red">
                    <FormattedMessage
                      id={'Carbon.offset'}
                    />
                  </Token>
                </Tab>
                <Tab>
                  <Token
                    content={sources.filter((el) => el.periodicity > 0).length.toString()}
                    color="red">
                    <FormattedMessage
                      id={'Carbon.recurring'}
                    />
                  </Token>
                </Tab>
              </TabList>

              <TabPanel>
                <CarbonList
                  isAdding={isAdding}
                  isFetching={isFetching}
                  sources={sources.filter((el) => !el.offsetted && el.periodicity < 1)}
                  currentlySelected={currentlySelected}
                  selectItem={selectItem}
                  deleteItem={deleteItem}
                  updateFrequency={updateFrequency}
                  setFilter={setFilter}
                  isSearchOpen={isSearchOpen}
                  type="toOffset"
                />
              </TabPanel>

              <TabPanel>
                <CarbonList
                  isAdding={isAdding}
                  isFetching={isFetching}
                  sources={sources.filter((el) => el.offsetted && el.periodicity < 1)}
                  currentlySelected={currentlySelected}
                  selectItem={selectItem}
                  deleteItem={deleteItem}
                  updateFrequency={updateFrequency}
                  setFilter={setFilter}
                  isSearchOpen={isSearchOpen}
                  type="offset"
                />
              </TabPanel>

              <TabPanel>
                <CarbonList
                  isAdding={isAdding}
                  isFetching={isFetching}
                  sources={sources.filter((el) => el.periodicity > 0)}
                  currentlySelected={currentlySelected}
                  selectItem={selectItem}
                  deleteItem={deleteItem}
                  updateFrequency={updateFrequency}
                  setFilter={setFilter}
                  isSearchOpen={isSearchOpen}
                  type="recurring"
                />
              </TabPanel>

            </Tabbed>
          }

          { dashboard &&
            <Link to="/calculator" className="carbon-sidebar__add">
              <IconText icon={OrangePlus}>
                  <Text color="orange">
                    <FormattedMessage
                      id={'CarbonSources.addMore'}
                      defaultMessage={'Add more sources'}
                    />
                  </Text>
              </IconText>
            </Link>
          }

          { errorMessages &&
            <ErrorFetching retry={fetchSources} />
          }
        </div>
      </Content>

      {
        !dashboard &&
        <Bottom>
          <Box
            flexBasis="100%"
            justifyContent="space-between"
            className="carbon-sidebar__bottom">
            <Box column>
              <Uppercase
                color="light">
                <FormattedMessage
                  id={'CarbonSidebar.total'}
                  defaultMessage={'Total CO² Emitted'}
                />
              </Uppercase>
              <Text color="orange">
                <FormattedNumber
                  value={getFormattedWeight(totalCarbon).value}
                /> {getFormattedWeight(totalCarbon).unit}
              </Text>
            </Box>

            {
              totalCarbon > 0 ?
              <ButtonLink
                to="/create-forest">
                <FormattedMessage
                  id={'CarbonSidebar.offset'}
                  defaultMessage={'Offset sources'}
                />
              </ButtonLink>
              :
              <DisabledButton>
                <FormattedMessage
                  id={'CarbonSidebar.offset'}
                  defaultMessage={'Offset sources'}
                />
              </DisabledButton>
            }
          </Box>
        </Bottom>
      }

    </Sidebar>
  );
};

CarbonSidebar.propTypes = {
  className: PropTypes.string,
  currentlySelected: PropTypes.number,
  deleteItem: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  fetchSources: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRemoving: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  selectItem: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  totalCarbon: PropTypes.number.isRequired,
  updateFrequency: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  filter: PropTypes.string,
  dashboard: PropTypes.bool,
  isFetchingForests: PropTypes.bool.isRequired,
  forests: PropTypes.array,
};

export default CarbonSidebar;
