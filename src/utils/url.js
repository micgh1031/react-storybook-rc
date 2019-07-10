export const getCurrentUrlEncoded = (pathname, search) => {
  return encodeURIComponent(`${pathname}${search ? search : ''}`);
};
