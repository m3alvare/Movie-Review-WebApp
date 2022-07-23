import React, { Component, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Fragment } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const serverURL = "" //Dev mode
// const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3066"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#C70039"
    },
    primary: {
      main: "#FF3333",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "1vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  reviewFormContainer: {
    marginTop: "1vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xl')]: {
      marginLeft: theme.spacing(0),
    },
  },
  movieGridContainer: {
    marginTop: "50vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },

  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
      Movies: [{}],
    }
  };

  componentDidMount() {
    // this.loadUserSettings();
    this.loadMovies();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  loadMovies() {
    this.callApiLoadMovies()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("Movies Loaded", parsed)
        this.setState({ Movies: parsed});
        console.log("BRUV")
      });
    // console.log(this.Movies[0])
  }

  callApiLoadMovies = async () => {

    const url = serverURL + "/api/getMovies";

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      // body: JSON.stringify({
      //   userID: this.state.userID
      // })
    });
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            <Review
              classes={classes}
              states = {this.state}
            />
            
          </Paper>
          
        </div>
      </MuiThemeProvider>
    );
  }
}

const Review = ({classes, states}) =>{
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [openMovieError, setOpenMovieError] = React.useState('');
  const [openTitleError, setOpenTitleError] = React.useState('');
  const [openReviewError, setOpenReviewError] = React.useState('');
  const [openRatingError, setOpenRatingError] = React.useState('');

  const [Reviews, setReviews] = React.useState([]);
  const [FormErrors, setFormErrors] = React.useState([]);

  const addReview = () => {
    console.log("add review")
    callApiAddReview()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        // var parsed = JSON.parse(res.express)
        console.log("Submission Successful!")
      });
  }

  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(states.Movies[selectedMovie].id)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        movieID: states.Movies[selectedMovie].id,
        userID: states.userID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Review Submited", body);
    // return body;
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const Validation = ({}) =>{
    var valid = true
    
    if (selectedMovie === ''){
      valid = false
      setOpenMovieError(true)
    }

    if (enteredTitle === ''){
      valid = false
      setOpenTitleError(true)
      // FormErrors.push("Please enter your review title")
    }

    if (enteredReview === ''){
      valid = false
      setOpenReviewError(true)
      // FormErrors.push("Please enter your review")
    }

    if (selectedRating === ''){
      valid = false
      setOpenRatingError(true)
      // FormErrors.push("Please enter your rating")
    }

    if (valid){
      Reviews.push({name:states.Movies[selectedMovie].name, title:enteredTitle, review:enteredReview, rating:selectedRating})
      console.log("about to add review to database")
      addReview();
      setOpen(true);
    }else {
      
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleCloseMovieError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMovieError(false);
  }

  const handleCloseTitleError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenTitleError(false);
  }

  const handleCloseReviewError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenReviewError(false);
  }

  const handleCloseRatingError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenRatingError(false);
  }

  return(
    <Fragment>
      <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="center"
          >
            {states.mode === 0 ? (
              <React.Fragment>
                Movie Reviews
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
      </Typography>

          <MovieSelection
            classes = {classes}
            states = {states}
            selectedMovie = {selectedMovie}
            setSelectedMovie = {setSelectedMovie}
          />

          <ReviewTitle
            classes = {classes}
            states = {states}
            enteredTitle = {enteredTitle}
            setEnteredTitle = {setEnteredTitle}
          />

          <ReviewBody
            classes = {classes}
            states = {states}
            enteredReview = {enteredReview}
            setEnteredReview = {setEnteredReview}
          />

          <ReviewRating
            classes = {classes}
            states = {states}
            selectedRating = {selectedRating}
            setSelectedRating = {setSelectedRating}
          />

          <Button 
            variant="contained" 
            color="Primary"
            onClick={Validation}>
            Submit Review
          </Button>

          <Snackbar open={openMovieError} autoHideDuration={6000} onClose={handleCloseMovieError}>
            <Alert onClose={handleCloseMovieError} severity="error">
              Please select the movie
            </Alert>
          </Snackbar>

          <Snackbar open={openTitleError} autoHideDuration={6000} onClose={handleCloseTitleError}>
            <Alert onClose={handleCloseTitleError} severity="error">
              Please enter your review title
            </Alert>
          </Snackbar>

          <Snackbar open={openReviewError} autoHideDuration={6000} onClose={handleCloseReviewError}>
            <Alert onClose={handleCloseReviewError} severity="error">
              Please enter your review
            </Alert>
          </Snackbar>

          <Snackbar open={openRatingError} autoHideDuration={6000} onClose={handleCloseRatingError}>
            <Alert onClose={handleCloseRatingError} severity="error">
              Please enter your rating
            </Alert>
          </Snackbar>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Your review has been received!
            </Alert>
          </Snackbar>

          <Typography
            variant={"h5"}
            className={classes.mainMessage}
            align="center"
          >
           Movie Reviews
          </Typography>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ minHeight: '50vh' }}
            className={classes.reviewFormContainer}
          >
            {Reviews.map(Reviews =>(
            <Grid item>
              <Card>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                   {Reviews.name} {" "}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Reviews.title} {" "}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {Reviews.review} {" "}
                  </Typography>
                  <Typography variant="body2" component="p">
                   {Reviews.Rating} {" "}
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>            

           ))}
          </Grid>

    </Fragment>

  )
  
}

const MovieSelection = ({classes, states, selectedMovie, setSelectedMovie}) => {
  const handleChange = (event) => {
    setSelectedMovie(event.target.value);
  };
  
  return(
    <Container 
      align="center"
    >
      <FormControl 
        className={classes.reviewFormContainer}
      >
        { <InputLabel id="demo-simple-select-helper-label"></InputLabel> }
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedMovie}
            onChange={handleChange}
            >
              {states.Movies.map((Movies, index) =>(
                <MenuItem value={index}>{Movies.name}</MenuItem>
              ))}
            
          </Select>
          <FormHelperText>Movie List</FormHelperText>
      </FormControl>
    </Container>
  )
}

const ReviewTitle = ({classes, states, enteredTitle, setEnteredTitle}) => {
  const handleChange = (event) => {
    setEnteredTitle(event.target.value);
  };
  return (
    <container
      align="center"
    >
      <form className={classes.reviewFormContainer} noValidate autoComplete="off">
        <TextField 
          id="outlined-basic" 
          label="Enter Title" 
          variant="outlined" 
          value={enteredTitle} 
          onChange={handleChange}
        />
      </form>
    </container>
  )
}

const ReviewBody = ({classes, states, enteredReview, setEnteredReview}) => {
  const handleChange = (event) => {
    setEnteredReview(event.target.value);
  };
  return (
    <container
      align = 'center'
    >
      <TextField 
      id="filled-multiline-static"
      label="Review"
      multiline
      rows={4}
      variant="filled"
      maxLength="200"
      value={enteredReview} 
      onChange={handleChange}
    />
    </container>
  )
}

const ReviewRating = ({classes, states, selectedRating, setSelectedRating}) => {
  const handleChange = (event) => {
    setSelectedRating(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Movie Rating</FormLabel>
      <RadioGroup row color="Primary" aria-label="Rating" name="Rating1" value={selectedRating} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="top"/>
        <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="top"/>
        <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="top"/>
        <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="top"/>
        <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="top"/>
      </RadioGroup>
    </FormControl>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
