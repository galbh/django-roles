import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './registration.page.scss';
import RegistrationFormComponent from '../../components/registration-form/registration-form.component.jsx';
import { bindActionCreators } from 'redux';
import { FetchUserTypesAction, RegistrationAction } from '../../../common/state/auth/auth.actions';
import { StartLoaderAction, StopLoaderAction } from '../../../common/state/shared/shared.actions';
import { ROUTES } from '../../../common/constants';

class RegistrationPage extends Component {

  constructor(props) {
    super(props)
    this.onRegister = this.onRegister.bind(this);
  }

  componentDidMount() {
    const { userTypes, fetchUserTypes, startLoader, stopLoader } = this.props;

    if (!userTypes) {
      startLoader();
      fetchUserTypes()
        .then(() => stopLoader());
    }
  }

  onRegister(data) {
    const { startLoader, stopLoader, registration, history } = this.props;
    startLoader();
    registration(data)
      .then(() => stopLoader())
      .then(() => history.push(ROUTES.home))
  }

  render() {

    const { userTypes } = this.props;

    return (
      <div className={styles.container}>
        {
          userTypes &&
          <RegistrationFormComponent
            userTypes={userTypes}
            onSubmit={this.onRegister}
          />
        }
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  userTypes: PropTypes.shape({
    [PropTypes.number]: PropTypes.string
  })
};

RegistrationPage.defaultProps = { userTypes: null };

function mapStateToProps(state) {
  return {
    userTypes: state.auth.userTypes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserTypes: bindActionCreators(FetchUserTypesAction, dispatch),
    startLoader: bindActionCreators(StartLoaderAction, dispatch),
    stopLoader: bindActionCreators(StopLoaderAction, dispatch),
    registration: bindActionCreators(RegistrationAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
