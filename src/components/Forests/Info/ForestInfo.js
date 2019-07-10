import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import HeadingSmall from '../../UI/Text/HeadingSmall';
import ForestSection from '../UI/ForestSection';
import ForestTitle from '../UI/ForestTitle';
import Graph from '../../Widgets/CarbonGraph/Graph';
import DataItem from '../UI/DataItem';

import { getFormattedArea, getFormattedWeight } from '../../../utils/units';

import './ForestInfo.css';

const ForestInfo = ({
  area,
  capturedCo2,
  description,
  forestName,
  formula,
  generatedO2,
  successionPlan,
  surface,
  userSurface,
  url = document.URL.split('/')
}) => {
  return (
    <div className="forest-info">
      <ForestSection>
        <ForestTitle>
          <FormattedMessage
            id={'ForestDetails.infoTitle'}
            defaultMessage={'About {forestName}'}
            values={{ forestName: forestName }}
          />
        </ForestTitle>
        <HeadingSmall color="light">
          {description}
        </HeadingSmall>

        { area && capturedCo2 && generatedO2 &&
          <div className="forest-info__my-data">

            <DataItem
              color="green"
              data={
                <span>
                  <FormattedNumber
                    value={getFormattedWeight(capturedCo2).value}
                  /> {getFormattedWeight(capturedCo2).unit}
                </span>
              }
              label={
                <FormattedMessage
                  id={'ForestDetails.capturedCo2'}
                  defaultMessage={'Captured CO²'}
                />
              }
            />

            <DataItem
              data={
                <span>
                  <FormattedNumber
                    value={getFormattedArea(area).value}
                  /> {getFormattedArea(area).unit}
                </span>
              }
              label={
                <FormattedMessage
                  id={'ForestDetails.myForestArea'}
                />
              }
            />

            <DataItem
              data={
                <span>
                  <FormattedNumber
                    value={getFormattedWeight(generatedO2).value}
                  /> {getFormattedWeight(generatedO2).unit}
                </span>
              }
              label={
                <FormattedMessage
                  id={'ForestDetails.generatedO2'}
                  defaultMessage={'Generated O²'}
                />
              }
            />
          </div>
        }

      </ForestSection>

      { formula &&
        <ForestSection>
          <Graph
            className="forest-info__graph"
            years={25}
            formula={formula}
            surface={url[url.length - 1] !== 'create-forest' ? surface : userSurface}
            userSurface={url[url.length - 1] !== 'create-forest' ? userSurface : 0}
          />
        </ForestSection>
      }

      <ForestSection>
        <ForestTitle>
          <FormattedMessage
            id={'ForestDetails.successionTitle'}
            defaultMessage={'Succession Plan'}
          />
        </ForestTitle>
        <HeadingSmall color="light">
          {successionPlan}
        </HeadingSmall>
      </ForestSection>
    </div>
  );
};

ForestInfo.propTypes = {
  area: PropTypes.number,
  capturedCo2: PropTypes.number,
  description: PropTypes.string,
  forestName: PropTypes.string,
  formula: PropTypes.string.isRequired,
  generatedO2: PropTypes.number,
  successionPlan: PropTypes.string,
  surface: PropTypes.number.isRequired,
  userSurface: PropTypes.number,
  url: PropTypes.array,
};

export default ForestInfo;
