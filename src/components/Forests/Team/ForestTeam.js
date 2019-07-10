import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ForestTitle from '../UI/ForestTitle';
import ForestSection from '../UI/ForestSection';
import ForestTeamMember from '../UI/ForestTeamMember';

const ForestTeam = ({ forestName, team }) => (
  <div>
    <ForestSection>
      <ForestTitle>
        <FormattedMessage
          id={'ForestDetails.teamTitle'}
          defaultMessage={'{forestName} team'}
          values={{ forestName: forestName }}
        />
      </ForestTitle>
      { team.map(member => (
        <div key={member.id}>
          <ForestTeamMember member={member} />
        </div>
      ))}
    </ForestSection>
  </div>
);

ForestTeam.propTypes = {
  forestName: PropTypes.string,
  team: PropTypes.array,
};

export default ForestTeam;
