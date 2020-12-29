import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { updateUser } from '../actions/user';

function Profile(props) {
  const [name, setName] = useState(props.user.user.name);
  const [email, setEmail] = useState(props.user.user.email);
  let inProgress = props.user.inProgress;

  if (!props.user.isLoggedin) {
    return <Redirect to="/login" />;
  }

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    let emailContent = email.trim();
    let nameContent = name.trim();

    if (emailContent.length !== 0 && nameContent.length !== 0) {
      console.log(nameContent, emailContent);
      //   props.dispatch(updateUser(nameContent, emailContent));
    }
  }

  return (
    <React.Fragment>
      <div id="profile-page-container">
        <div id="cover-container">
          <img className="cover-img" />
        </div>

        <div className="profile-update-container">
          <img
            className="user-dp"
            src="https://cdn3.iconfinder.com/data/icons/users-6/100/2-256.png"
          />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>
              <TextField
                id="name-field"
                label="name"
                value={name}
                onChange={onChangeName}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AlternateEmailIcon />
            </Grid>
            <Grid item>
              <TextField
                id="email-field"
                label="email"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
          </Grid>
          <Button
            disabled={inProgress}
            id="update-btn"
            color="primary"
            onClick={onSubmit}
          >
            update
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
