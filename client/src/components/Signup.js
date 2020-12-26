import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import { createUser } from '../actions/user';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  let onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  let onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
      console.log(nameContent, emailContent, password);
      props.dispatch(
        createUser(
          nameContent,
          emailContent,
          password,
          confirmPassword,
          'teacher'
        )
      );
      setPassword('');
      setConfirmPassword('');
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

      <TextField
        id="name"
        label="name"
        variant="outlined"
        value={name}
        onChange={onChangeName}
      />
      <TextField
        id="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={onChangeEmail}
      />

      <TextField
        id="password"
        type="password"
        label="password"
        variant="outlined"
        value={password}
        onChange={onChangePassword}
      />
      <TextField
        id="confirm_password"
        type="password"
        label="confirm password"
        variant="outlined"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
      />

      <Button
        type="submit"
        className="submit-btn"
        disabled={inProgress}
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
