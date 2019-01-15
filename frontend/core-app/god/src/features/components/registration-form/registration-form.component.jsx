import React, { Component } from 'react';
import { Select, ListItem, ListItemText, MenuItem, InputLabel, FormControl, Card, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './registration-form.component.scss';

class RegistrationFormComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      full_name: '',
      phone_number: '',
      username: '',
      userType: "3"
    }
  }

  render() {

    const { userTypes, onSubmit } = this.props;
    const { userType } = this.state;

    return (
      <div className={styles.container}>        
        <Card className={styles.card}>
          <div>Register a new user</div>
          <form autoComplete="off" onSubmit={e => { e.preventDefault(); onSubmit(this.state) }}>
            {
              <FormControl className={styles.formControl}>

                <section>
                  {/* Email */}
                  <div>
                    <TextField
                      fullWidth
                      label='* email'
                      type='email'
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <TextField
                      fullWidth
                      type='password'
                      label='* password'
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                </section>

                <section>
                  {/* Full name */}
                  <div>
                    <TextField
                      fullWidth
                      label='full name'
                      value={this.state.full_name}
                      onChange={e => this.setState({ full_name: e.target.value })}
                    />
                  </div>

                  {/* User type */}
                  <div>
                    <InputLabel>User types</InputLabel>
                    <Select
                      fullWidth
                      value={userType}
                      onChange={(e) => this.setState({ userType: e.target.value })}
                    >
                      {
                        Object.keys(userTypes).map(key => {
                          return (
                            <MenuItem key={key} value={key}>{userTypes[key]}</MenuItem>
                          )
                        })
                      }

                    </Select>
                  </div>
                </section>

                <section>
                  {/* Username */}
                  <div>
                    <TextField
                      fullWidth
                      label='username'
                      value={this.state.username}
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <TextField
                      fullWidth
                      label='phone number'
                      value={this.state.phone_number}
                      onChange={e => this.setState({ phone_number: e.target.value })}
                    />
                  </div>
                </section>

                <section>
                  <div>
                    <Button fullWidth variant='raised' type='submit'>submit</Button>
                  </div>
                </section>
              </FormControl>
            }
          </form>
        </Card>
      </div>
    )
  }
}

RegistrationFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegistrationFormComponent;
