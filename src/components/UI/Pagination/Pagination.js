import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';

import Small from '../../UI/Text/Small';
import Text from '../../UI/Text/Text';
import NavigationPrev from '../../UI/Icons/NavigationPrev';
import NavigationNext from '../../UI/Icons/NavigationNext';

import './Pagination.css';

const Pagination = ({
  className,
  current,
  getMore,
  pageLength,
  total,
}) => {
  const totalPages = Math.ceil(total / pageLength);
  const firstItem = ( current - 1 ) * pageLength + 1;
  const lastItem = current * pageLength > total ? total : current * pageLength;

  return (
    <Box
      className={cx(className, 'pagination')}
      justifyContent="space-between"
      alignItems="center">

      <ul className="pagination__nav">
        <li
          className={cx(
            'pagination__item',
            'pagination__item--prev',
            { 'pagination__item--disabled': current - 1 < 1 }
          )}
          onClick={() => { current - 1 >= 1 && getMore(current - 1); }}
        >
          <NavigationPrev />
        </li>

        {
          [...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={cx(
                'pagination__item',
                { 'pagination__item--active': current === index + 1 }
              )}
              onClick={() => { current !== index + 1 && getMore(index + 1); }}>
              <Text>{index + 1}</Text>
            </li>
          ))
        }

        <li
          className={cx(
            'pagination__item',
            'pagination__item--prev',
            { 'pagination__item--disabled': current + 1 > totalPages }
          )}
          onClick={() => { current + 1 <= totalPages && getMore(current + 1); }}
        >
          <NavigationNext />
        </li>
      </ul>

      <Small>
        Showing: {firstItem} - {lastItem} of {total}
      </Small>
    </Box>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  current: PropTypes.number.isRequired,
  getMore: PropTypes.func.isRequired,
  pageLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
