import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { clearSnackBar } from '../actions/snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.dispatch(clearSnackBar());
  };

  let message = props.snackbar.message;
  let variant = props.snackbar.variant;
  let duration = props.snackbar.duration;
  let open = props.snackbar.open;

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
      {/* Examples:
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    snackbar: state.snackbar,
  };
}

export default connect(mapStateToProps)(CustomizedSnackbars);
