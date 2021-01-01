import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Paper, Tabs, Tab } from '@material-ui/core';

import { createUser } from '../actions/user';

function Signup(props) {
  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [name, setName] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');

  // For the type tabs
  const [type, setType] = useState('teacher');

  const handleTypeChange = (event, newType) => {
    setType(newType);
  };

  function onSubmit(e) {
    e.preventDefault();
    let emailContent = email.trim();
    let nameContent = name.trim();

    if (password !== confirmPassword) {
      console.log('Passwords didnt match');
      return;
    }

    if (
      emailContent.length !== 0 &&
      password.length !== 0 &&
      nameContent.length !== 0
    ) {
      // console.log(type);
      // console.log(nameContent, emailContent, password);
      props.dispatch(
        createUser(nameContent, emailContent, password, confirmPassword, type)
      );
    }
  }

  let { inProgress, isLoggedin } = props.user;

  if (isLoggedin) {
    console.log('Redirect');
    return <Redirect to="/" />;
  }

  return (
    <form className="form-container">
      <p className="form-title">Signup</p>

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
        id="name"
        label="name"
        variant="outlined"
        value={name}
        onChange={setName}
      />
      <TextField
        id="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={setEmail}
      />

      <TextField
        id="password"
        type="password"
        label="password"
        variant="outlined"
        value={password}
        onChange={setPassword}
      />
      <TextField
        id="confirm_password"
        type="password"
        label="confirm password"
        variant="outlined"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <Button
        type="submit"
        className="submit-btn"
        disabled={inProgress}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Signup
      </Button>
      <a href="#">
        <img
          alt="sign up with google"
          src="https://www.flaticon.com/svg/static/icons/svg/281/281764.svg"
        />
      </a>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Signup);
