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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { setSnackBar } from '../actions/snackbar';
import { updateUser, changePassword } from '../actions/user';

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
  accordionContainer: {
    width: '50%',
    margin: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
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

  let handleConfirm = () => {
    let password = document.getElementById('dialog-password').value;

    if (password.length === 0) {
      setSnackBar('error', 'Password is empty', 3000);
      return;
    }
    console.log('Hello: ', password);

    props.dispatch(
      updateUser(
        name,
        email,
        props.user.user.type,
        bio,
        '',
        contact,
        subject,
        password
      )
    );

    handleDialogClose();
  };

  // For password change
  const [oldPassword, setOldPassword] = useInput('');
  const [newPassword, setNewPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');

  let handlePassChange = () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      props.dispatch(setSnackBar('error', 'Fields empty', 3000));
      return;
    }
    if (newPassword !== confirmPassword) {
      props.dispatch(setSnackBar('error', 'Passwords not matching', 3000));
      return;
    }

    props.dispatch(changePassword(oldPassword, newPassword, confirmPassword));
  };

  let PasswordConfirmDialog = () => {
    return (
      <Dialog
        open={open}
        // onClose={handleConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please Confirm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="dialog-password"
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

  let inProgress = props.user.inProgress;

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
            disabled={inProgress}
          >
            Update
          </Button>
        </FormGroup>
      </form>

      <PasswordConfirmDialog />

      {/* Password Change */}
      <div className={classes.accordionContainer}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="password-accordion"
          >
            <Typography className={classes.heading}>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.content}>
            <TextField
              id="old_password"
              className={classes.formItems}
              type="password"
              label="Old Password"
              variant="outlined"
              value={oldPassword}
              onChange={setOldPassword}
            />
            <br />

            <TextField
              id="password"
              className={classes.formItems}
              type="password"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={setNewPassword}
            />

            <TextField
              id="confirm-password"
              className={classes.formItems}
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.formItems + ' updBtn'}
              onClick={handlePassChange}
              disabled={inProgress}
            >
              Confirm
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
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
