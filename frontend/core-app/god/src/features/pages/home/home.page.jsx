import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './home.page.scss';
import { bindActionCreators } from 'redux';
import { FetchUsersAction, FetchUserTypesAction, DeleteUserAction } from '../../../common/state/auth/auth.actions';
import { StartLoaderAction, StopLoaderAction } from '../../../common/state/shared/shared.actions';
import UsersListComponent from '../../components/users-list/users-list.component.jsx';
import { OpenDialogAction, CloseDialogAction } from '../../../common/state/dialog/dialog.actions';
import ConfirmButtonsPanelComponent from '../../components/confirm-buttons-panel/confirm-buttons-panel.component.jsx';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    const { startLoader, stopLoader, fetchUsers, fetchUserTypes } = this.props;

    startLoader();
    fetchUsers()
      .then(() => fetchUserTypes())
      .then(() => stopLoader());
  }

  onConfirmDeleteUser(user) {
    const { startLoader, stopLoader, deleteUser, fetchUsers, closeDialog } = this.props;

    startLoader();
    deleteUser(user.id)
      .then(() => fetchUsers())
      .then(() => stopLoader())
      .then(() => closeDialog())
  }

  onDeleteUser(user) {
    const { openDialog, closeDialog } = this.props;
    openDialog(
      'confirm',
      <div>
        <div>are you sure you want to delete {user.username} ?</div>
        <ConfirmButtonsPanelComponent 
          onConfirm={() => this.onConfirmDeleteUser(user)}
          onCancel={closeDialog}
        />
      </div>
    )
  }

  render() {
    const { users, userTypes, loggedInUser } = this.props;

    return (
      <div className={styles.homePage}>
        {
          userTypes && users.length && loggedInUser &&
          <div>
            <div>Users list</div>
            <UsersListComponent
              users={users}
              userTypes={userTypes}
              onDeleteUserClick={this.onDeleteUser}
              loggedInUser={loggedInUser}
            />
          </div>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  t: propTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.auth.users,
    userTypes: state.auth.userTypes,
    loggedInUser: state.auth.loggedInUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserTypes: bindActionCreators(FetchUserTypesAction, dispatch),
    fetchUsers: bindActionCreators(FetchUsersAction, dispatch),
    startLoader: bindActionCreators(StartLoaderAction, dispatch),
    stopLoader: bindActionCreators(StopLoaderAction, dispatch),
    deleteUser: bindActionCreators(DeleteUserAction, dispatch),
    openDialog: bindActionCreators(OpenDialogAction, dispatch),
    closeDialog: bindActionCreators(CloseDialogAction, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(translate()(HomePage));
