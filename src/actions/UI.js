import actionTypes from '../constants/actionTypes';

export const toggleUserDropDown = () => ({
  type: actionTypes.USER_POPUP_TOGGLE
});

export const openUserDropDown = () => ({
  type: actionTypes.USER_POPUP_OPEN
});

export const closeUserDropDown = () => ({
  type: actionTypes.USER_POPUP_CLOSE
});

export const openGallery = gallery => ({
  type: actionTypes.GALLERY_OPEN,
  payload: gallery,
});

export const closeGallery = () => ({
  type: actionTypes.GALLERY_CLOSE
});

export const updateLoadStatus = (status) => ({
  type: actionTypes.LOAD_STATUS,
  payload: status,
});
