import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Small from '../Text/Small';

import './PhotoInput.css';

import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

class PhotoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: null,
      imagePreviewUrl: null,
    };
  }

  setAvatar(e) {
    e.preventDefault();
    const {addAlert} = this.props;

    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) { return; }

    let fileSize = file.size / Math.pow(1024, 2);
    if(fileSize > 5) {
      addAlert({
        type: 'error',
        message: 'Image too big. Limit is 5Mb',
        dismissAfter: 2000
      });
      return;
    }

    reader.onloadend = () => {
      this.props.input.onChange(file);
      this.setState({
        filename: file.name,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { label, avatar, input, uploadProgress } = this.props;
    delete input.value;

    if (uploadProgress > 0) {
      return (
        <div className="progress">
          <div className="progress__bar"
            style={{width: uploadProgress}}
          />
        </div>
      );
    }

    return (
      <div className="photo-input">

        <div
          className="photo-input__photo"
          style={{
            backgroundImage: `url(${
              this.state.imagePreviewUrl
              || avatar
              || AvatarPlaceholder
            })`
          }}/>

        <div>
          <label
            htmlFor="userPhoto"
            className="photo-input__label">
            <Small
              tag="span"
              className="main-input__label">
              {label}
            </Small>
            <span className="photo-input__text">
              {
                this.state.filename ||
                <FormattedMessage
                  id={'Account.photoInputPlaceholder'}
                  defaultMessage={'Upload Photo'}
                />
              }
            </span>
          </label>
          <input
            {...input}
            id="userPhoto"
            className="photo-input__field"
            type="file"
            accept="image/*"
            onChange={this.setAvatar.bind(this)}
          />
        </div>

      </div>
    );
  }
}

PhotoInput.propTypes = {
  avatar: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  uploadProgress: PropTypes.number,
  addAlert: PropTypes.func.isRequired,
};

export default PhotoInput;
