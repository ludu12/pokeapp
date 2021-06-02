import PropTypes from 'prop-types';
import React from 'react';

const ActionPropTypes = {
  onClick: PropTypes.func
};

export const DownloadAction = (props) => {
  const { onClick } = props;
  return (
    <button title={'Download'} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </button>
  );
};

DownloadAction.propTypes = ActionPropTypes;

export const ClearAction = (props) => {
  const { onClick } = props;
  return (
    <button title={'Clear'} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

ClearAction.propTypes = ActionPropTypes;
