import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Select,
  TextField,
  FormGroup,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setSnackBar } from '../actions/snackbar';
import { updateUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formGroups: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    minWidth: 200,
    margin: '50px auto',
    justifyContent: 'center',
  },
  formItems: {
    margin: '4px',
  },
}));

function Settings(props) {
  const classes = useStyles();

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  const subjectOptions = ['Maths', 'Physics', 'Chemistry'];
  const [email, setEmail] = useInput(props.user.user.email);
  const [name, setName] = useInput(props.user.user.name);
  const [contact, setContact] = useInput(props.user.user.contact);
  const [subject, setSubject] = useInput(props.user.user.subject);
  const [bio, setBio] = useInput(props.user.user.bio);
  const [password, setPassword] = useInput('');

  const [open, setOpen] = useState(false);

  let handleSubmit = (e) => {
    console.log(email, name, contact, subject, bio);
    // validate all the fields
    if (
      !email ||
      email.trim().length === 0 ||
      !name ||
      name.trim().length === 0 ||
      !contact ||
      contact === 0
    ) {
      props.dispatch(setSnackBar('error', 'Required field empty', 3000));
      return;
    }

    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    let old_password = document.getElementById('old_password').value;

    if (old_password.length === 0) {
      setSnackBar('error', 'Password is empty', 3000);
      return;
    }

    props.dispatch(
      updateUser(
        name,
        email,
        props.user.user.type,
        bio,
        '',
        contact,
        subject,
        old_password
      )
    );

    handleDialogClose();
  };

  let PasswordConfirmDialog = (props) => {
    return (
      <Dialog
        open={open}
        onClose={handleConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please Confirm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="old_password"
            label="Password"
            type="password"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (!props.user.isLoggedin) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <form>
        <FormGroup className={classes.formGroups}>
          <TextField
            id="email"
            className={classes.formItems}
            // type="email"
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={setEmail}
          />
          {/* <TextField
            id="password"
            className={classes.formItems}
            type="password"
            label="New Password"
            variant="outlined"
            value={password}
            onChange={setPassword}
          /> */}

          <TextField
            id="name"
            className={classes.formItems}
            type="text"
            label="name"
            variant="outlined"
            required
            value={name}
            onChange={setName}
          />
          <TextField
            id="contact"
            className={classes.formItems}
            type="number"
            label="Contact No"
            variant="outlined"
            placeholder="+91"
            required
            value={contact}
            onChange={setContact}
          />
        </FormGroup>

        <FormGroup className={classes.formGroups}>
          <TextField
            id="bio"
            multiline
            className={classes.formItems}
            type="text"
            label="Bio"
            variant="outlined"
            placeholder="Add some Details"
            rows={4}
            rowsMax={6}
            value={bio}
            onChange={setBio}
          />

          <Select
            className={classes.formItems}
            labelId="subject"
            id="demo-simple-select-filled"
            displayEmpty
            variant="outlined"
            value={subject}
            onChange={setSubject}
          >
            {subjectOptions.map((subject) => (
              <MenuItem value={subject}>{subject}</MenuItem>
            ))}
          </Select>
        </FormGroup>
        <FormGroup className={classes.formGroups}>
          <Button
            variant="contained"
            color="primary"
            className={classes.formItems + ' updBtn'}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </FormGroup>
      </form>

      <PasswordConfirmDialog />
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    snackbar: state.snackbar,
  };
}

export default connect(mapStateToProps)(Settings);
