import React from 'react';

const MapTreeIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="26" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M14.17 16.91c.22 1.476.33 3.173.33 5.09h-3c0-1.994.1-3.693.296-5.096C8.504 16.374 6 13.71 6 10.5 6 6.91 9.134 4 13 4s7 2.91 7 6.5c0 3.22-2.52 5.893-5.83 6.41z"/><filter id="a" width="200%" height="177.8%" x="-50%" y="-27.8%" filterUnits="objectBoundingBox"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" in="shadowBlurOuter1"/></filter><ellipse id="c" cx="13" cy="10.5" rx="7" ry="6.5"/></defs><g fill="none" fillRule="evenodd"><g transform="translate(-2 -2)"><use fill="#000" filter="url(#a)" xlinkHref="#b"/><use fill="#B67D27" xlinkHref="#b"/></g><g transform="translate(-2 -2)"><use fill="#49D690" xlinkHref="#c"/><ellipse cx="13" cy="10.5" stroke="#2CA86A" strokeWidth="1.5" rx="6.25" ry="5.75"/></g></g></svg>
);

export default MapTreeIcon;
