import React, { Component } from 'react';
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

//Dev mode
const serverURL = ""; //enable for dev mode

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
      default: "#000000"
    },
    primary: {
      main: "#f44336",
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
      Movies: [{
          Title: "The Usual Suspects",
          ReviewTitle: "No Review Title",
          Review: "No Review",
          Rating: "No Rating"
        },
        {
          Title: "Ratatouille",
          ReviewTitle: "No Review Title",
          Review: "No Review",
          Rating: "No Rating"
        },
        {
          Title: "Nemo",
          ReviewTitle: "No Review Title",
          Review: "No Review",
          Rating: "No Rating"
        },
        {
          Title: "The Big Short",
          ReviewTitle: "No Review Title",
          Review: "No Review",
          Rating: "No Rating"
        },
        {
          Title: "Whiplash",
          ReviewTitle: "No Review Title",
          Review: "No Review",
          Rating: "No Rating"
        }
      ]
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
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

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '10vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Movie Reviews
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

        </Grid>

        

      </Grid>
    )

    const reviewForm =(
      <Grid
        container
        spacing={5}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.reviewFormContainer}
      >

      <Grid item>
        <FormControl >
          <InputLabel id="demo-simple-select-helper-label"></InputLabel>
          <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           
           // value={age}
           // onChange={handleChange}
          >
            <MenuItem value="Movies">
             <em>None</em>
           </MenuItem>
           {this.state.Movies.map((Movies, index) =>(
            <MenuItem value={index}>{Movies.Title}</MenuItem>
           ))}
           
          </Select>
          </FormControl>
        <FormHelperText>Movie List</FormHelperText>
      </Grid>

      <Grid item>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Enter Title" variant="outlined" />
        </form>
      </Grid>

      <Grid item>
        <TextField
          id="filled-multiline-static"
          label="Review"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
          maxlength="200"
        />
      </Grid>

      <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Movie Rating</FormLabel>
            <RadioGroup row aria-label="Rating" name="Rating1" /*value={value} onChange={handleChange}*/>
              <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="top"/>
              <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="top"/>
              <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="top"/>
              <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="top"/>
              <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="top"/>
            </RadioGroup>
          </FormControl>
      </Grid>

      <Grid item>
          <Button variant="contained" color="Primary">
            Submit Review
          </Button>
      </Grid>

    </Grid>
    )

    const movieGrid =(
      <Grid
        container
        spacing={5}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.reviewFormContainer}
      >
        {this.state.Movies.map(Movies =>(
            <Grid item>
              <Card>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                   {Movies.Title} {" "}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Movies.ReviewTitle} {" "}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {Movies.Review} {" "}
                  </Typography>
                  <Typography variant="body2" component="p">
                   {Movies.Rating} {" "}
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>
           ))}
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
            {reviewForm}
            {movieGrid}
          </Paper>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
