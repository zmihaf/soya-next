import PropTypes from 'prop-types';

export const COMPONENT = 'COMPONENT';
export const PAGE = 'PAGE';

export const localeShape = PropTypes.shape({
  country: PropTypes.string,
  language: PropTypes.string,
});
