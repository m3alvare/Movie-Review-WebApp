import React, { Component} from 'react';
import Typography from "@material-ui/core/Typography";
import NavigationBar from '../NavigationBar';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../../Theme';
import { FormControl, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// const serverURL = "" //Dev mode
const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3066"; //enable for dev mode

const styles = theme => ({ 

    pageContainer: {
        marginTop: "0vh",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          marginLeft: theme.spacing(4),
        },
        minHeight: '91vh'
      },

    pageTitle: {
        marginTop: "0vh",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          marginLeft: theme.spacing(4),
        },
        padding: "2.5vh"
    },
    quizForm: {
        marginTop: "1vh",
        marginLeft: theme.spacing(20),
        marginBottom: 15,
        [theme.breakpoints.down('xl')]: {
          marginLeft: theme.spacing(2),
        },
      },

})

class Quiz extends Component {
    constructor(props) {
      super(props);

      this.state = {
            quizMovie : "",
            directorFirstName : "",
	        directorLastName : ""
      }
    };

    componentDidMount() {
        this.newQuizMovie()

    }

    newQuizMovie = () =>{
    
        this.callApiRandMovie()
        .then(res => {
                var parsed = JSON.parse(res.express);
                console.log("Quiz Movie retrieved", parsed)
                this.setState({ 
                    quizMovie: parsed[0].name,
                    directorFirstName : parsed[0].first_name,
                    directorLastName : parsed[0].last_name
                });
            });
    }

    callApiRandMovie = async () => {
        console.log("API called")
        const url = serverURL + "/api/randMovie";
        
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
          console.log(body)
          if (response.status !== 200) throw Error(body.message);
      
          return body;
    }

    render() {

        const { classes } = this.props;

        return (
            <MuiThemeProvider theme ={theme}>
                <NavigationBar/>
                <Paper
                    className={classes.pageContainer}
                    square
                >
                    <Typography 
                        variant="h3"
                        align="center"
                        className= {classes.pageTitle}
                    >
                        Movie Quiz
                    </Typography>

                    <Typography 
                        variant="h6"
                        align="center"
                        className= {classes.pageTitle}
                    >
                        A Movie will be selected and you must guess the director's first and last name
                    </Typography>
                    
                    <QuizForm
                        classes = {classes}
                        states = {this.state}
                        newQuizMovie = {this.newQuizMovie}
                    />
                </Paper>
            </MuiThemeProvider>
        )
    }
}

const QuizForm = ({classes, states, newQuizMovie}) => {
    const [actorGuess, setActorGuess] = React.useState('');
    const [correctGuess, setCorrectGuess] = React.useState(false);
    const [incorrectGuess, setIncorrectGuess] = React.useState(false);
    const [hotStreak, setHotStreak] = React.useState(0);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setCorrectGuess(false);
        setIncorrectGuess(false)
      }

    const handleChange = (event) => {
        setActorGuess(event.target.value);
      };

    const tryAgain = () => {
        newQuizMovie()
        setHotStreak(0)
    }
    const checkGuess = ({}) =>{
 
        let director = actorGuess
        // .split(" ");
        // let directorFirstName = director[0]
	    // let directorLastName = director[1]
        // console.log(answer: director)
        
        if (director === states.directorFirstName + " " + states.directorLastName){
            setCorrectGuess(true)
            setHotStreak(hotStreak + 1)
            newQuizMovie()
        }else {
            setIncorrectGuess(true)
            setHotStreak(0)
        }
    }

    return(
        <div
            align="center"
        >
            <FormControl>
                <Chip 
                className = {classes.quizForm}
                label = {states.quizMovie} 
                />

                <TextField 
                    className = {classes.quizForm}
                    id="outlined-basic" 
                    label="Guess the Director" 
                    variant="outlined" 
                    value={actorGuess} 
                    onChange={handleChange}
                />
            </FormControl>
                    
            <br/>
            <Button 
                className = {classes.quizForm}
                variant="contained" 
                color="Primary"
                onClick={checkGuess}
            >
                Submit Guess
            </Button>

            <Button 
                className = {classes.quizForm}
                variant="contained" 
                color="Primary"
                onClick={tryAgain}
            >
                Try Another Movie
            </Button>

            <br/>
            <Snackbar open={correctGuess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    CORRECT GUESS!
                </Alert>
            </Snackbar>

            <Snackbar open={incorrectGuess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    WRONG ANSWER, GUESS AGAIN! 
                </Alert>
            </Snackbar>

            <br/>
            <Typography                 
                align="center"
                className= {classes.pageTitle}
            >
                Hot Streak
            </Typography>
            
            <Chip 
                className = {classes.quizForm}
                label = {hotStreak} 
                />

        </div>
        
    )
}

export default withStyles(styles)(Quiz);