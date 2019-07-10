import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import Text from '../../UI/Text/Text';
import HeadingSmall from '../../UI/Text/HeadingSmall';
import Uppercase from '../../UI/Text/Uppercase';

import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

import './ForestTeamMember.css';

const ForestTeamMember = ({ member }) => (
  <Box column className="forest-team-member">
    <Box alignItems="center" className="forest-team-member__header">
      <div
        className="forest-team-member__image"
        style={{
          backgroundImage: `url(${member.avatar || AvatarPlaceholder})`
        }}
      />
      <Box column className="forest-team-member__info">
        <Uppercase color="light" className="forest-team-member__title">
          {member.title}
        </Uppercase>
        <HeadingSmall className="forest-team-member__name">
          {member.full_name}
        </HeadingSmall>
      </Box>
    </Box>

    <Text color="light" className="forest-team-member__bio">
      {member.bio}
    </Text>
  </Box>
);

ForestTeamMember.propTypes = {
  member: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    full_name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ForestTeamMember;
