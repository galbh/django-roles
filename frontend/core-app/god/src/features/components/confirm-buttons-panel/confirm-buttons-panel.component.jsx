import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { translate } from 'react-i18next';
import styles from './confirm-buttons-panel.component.scss';

const ConfirmButtonsPanelComponent = props => (
  <div className={`${styles.container} ${props.className}`}>
    <Button
      type="submit"
      className="btn-primary"
      variant='raised'
      color='primary'      
      onClick={props.onConfirm}
      disabled={props.disabled}
    >
      {props.confirmText || props.t('common:CONFIRM')}
    </Button>

    <Button
      variant='raised'
      color='secondary'
      onClick={props.onCancel}
      className="cancel"
    >
      {props.cancelText || props.t('common:DISMISS')}
    </Button>
  </div>
);

ConfirmButtonsPanelComponent.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string
};

ConfirmButtonsPanelComponent.defaultProps = {
  disabled: false, className: '', confirmText: null, cancelText: null, onCancel: () => { }
};

export default translate()(ConfirmButtonsPanelComponent);
