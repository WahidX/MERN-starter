import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Paper, Tabs, Tab } from '@material-ui/core';

import { createSession } from '../actions/user';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For the type tabs
  const [type, setType] = useState('teacher');

  const handleTypeChange = (event, newType) => {
    setType(newType);
  };

  let onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  let onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    let emailContent = email.trim();

    if (emailContent.length !== 0 && password.length !== 0) {
      console.log(emailContent, password);
      props.dispatch(createSession(emailContent, password, type));
      setPassword('');
    }
  }

  let { inProgress, isLoggedin } = props.user;
  if (isLoggedin) {
    return <Redirect to="/" />;
  }

  return (
    <form className="form-container">
      <p className="form-title">Login</p>

      <Paper square>
        <Tabs
          variant="fullWidth"
          value={type}
          indicatorColor="secondary"
          textColor="primary"
          onChange={handleTypeChange}
          centered
        >
          <Tab label="Teacher" value="teacher" />
          <Tab label="Student" value="student" />
        </Tabs>
      </Paper>

      <TextField
        id="email"
        label="email"
        value={email}
        variant="outlined"
        onChange={onChangeEmail}
      />
      <br />
      <TextField
        id="password"
        type="password"
        label="password"
        value={password}
        variant="outlined"
        onChange={onChangePassword}
      />
      <Button
        type="submit"
        className="submit-btn"
        disabled={inProgress}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Login
      </Button>

      {/*  For Google's Oauth */}
      {/* <a href="#">
        <img
          alt="sign up with google"
          src="https://www.flaticon.com/svg/static/icons/svg/281/281764.svg"
        />
      </a> */}
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
