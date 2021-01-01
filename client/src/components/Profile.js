import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Profile(props) {
  if (!props.user.isLoggedin) {
    return <Redirect to="/login" />;
  }

  let { name, email, bio, subject, type, contact } = props.user.user;

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography>{type}</Typography>

          <Typography style={{ fontSize: '2rem' }}>
            <AccountCircleIcon />
            &nbsp;{name}
          </Typography>

          <Typography style={{ fontSize: '2rem' }}>
            <AlternateEmailIcon />
            &nbsp;{email}
          </Typography>
          <Typography>Bio: {bio}</Typography>

          <Typography>Subject: {subject}</Typography>
          <Typography>Contact: {contact}</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
