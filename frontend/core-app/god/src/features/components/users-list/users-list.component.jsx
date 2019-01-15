import React from 'react';
import PropTypes from 'prop-types';
import { List, MenuItem } from '@material-ui/core';
import styles from './users-list.component.scss';
import userModel from '../../../common/state/auth/auth.models';

const UsersListComponent = ({ users, onUserClick, onDeleteUserClick, userTypes, loggedInUser }) => {
  
  const noLoggedInUserList = users.filter(u => u.id !== loggedInUser.id);
  const list = loggedInUser ? noLoggedInUserList : users;

  return (
    <div className={styles.container}>
      <List>
        {
          list.map(user => (
            <MenuItem
              key={user.id}
              onClick={onUserClick}
              className={styles.listItem}
            >
              <div>{user.username}</div>
              <div>{userTypes[user.user_type]}</div>

              {
                onDeleteUserClick &&
                <i
                  onMouseDown={e => { e.stopPropagation(); onDeleteUserClick(user) }}
                  className='material-icons'
                >
                  clear
              </i>
              }
            </MenuItem>
          ))
        }
      </List>
    </div>
  )
};

UsersListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(userModel)).isRequired,
  loggedInUser: PropTypes.shape(userModel),
  onUserClick: PropTypes.func,
  onDeleteUserClick: PropTypes.func,
  userTypes: PropTypes.shape({ [PropTypes.number]: PropTypes.string })
};

UsersListComponent.defaultProps = {
  onUserClick: null,
  onDeleteUserClick: null,
  loggedInUser: null
}

export default UsersListComponent;
