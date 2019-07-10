import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Box from 'react-layout-components';

import { getFormattedArea } from '../../utils/units';
import { carbonAmountIn } from '../../utils/carbon';

import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import Heading from '../UI/Text/Heading';
import HeadingSmall from '../UI/Text/HeadingSmall';
import ButtonLink from '../UI/Button/ButtonLink';
import Forest from '../Forests/Create/Forest';

import Cluster from '../../assets/images/cluster.png';

import './ThankYou.css';

const ThankYou = ({forest, area, price}) => (
  <Container>
    <Content>
      <Box column className="thanks">
        <div className="thanks__tree-holder">
          <img className="thanks__tree" alt="cluster" src={Cluster} />
          <img className="thanks__tree" alt="cluster" src={Cluster} />
          <img className="thanks__tree" alt="cluster" src={Cluster} />
        </div>
        <div className="thanks__text">
          <Heading>
            <FormattedMessage
              id={'checkoutMessages.youNowOwn'}
              defaultMessage={'You are now a forest owner'}
            />
          </Heading>
          <br/>
          <HeadingSmall color="light">
            <FormattedMessage
              id={'checkoutMessages.congratulations'}
              defaultMessage={'Congratulations, you have successfully bought {value}{unit} of the Genesis Forest'}
              values={{
                value: getFormattedArea(area).value,
                unit: getFormattedArea(area).unit
              }}
            />
          </HeadingSmall>
        </div>

        <div className="thanks__forest">
          <Forest
            available={forest.available}
            key={forest.id}
            forest={forest}
            purchasable={true}
            getData={()=> {
              return {
                price: price,
                area: area,
                carbon: carbonAmountIn(25,forest.timeline_formula),
              };
            }}
            thankYou={true}
          />
        </div>

        <ButtonLink big to={`/my-forests/${forest.id}`}>
          <FormattedMessage
            id={'checkoutMessages.goToForest'}
            defaultMessage={'Go to {forestName}'}
            values={{ forestName: forest.name }}
          />
        </ButtonLink>
      </Box>
    </Content>
  </Container>
);

ThankYou.propTypes = {
  forest: PropTypes.object.isRequired,
  area: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default ThankYou;
