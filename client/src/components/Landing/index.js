import React, { Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import NavigationBar from '../NavigationBar';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../../Theme';
import { Paper } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MovieProjectorModel from '../3DModel';
import FormControl from '@material-ui/core/FormControl';

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
    
    pageDescriptionsContainer: {
        marginTop: "6vh",
        // marginLeft: theme.spacing(20),
        marginBottom: 15,
        [theme.breakpoints.down('xl')]: {
          marginLeft: theme.spacing(2),
        },
        width: "30vh"
    },

    pageDescriptions: {
        marginTop: "6vh",
        // marginLeft: theme.spacing(20),
        marginBottom: 15,
        [theme.breakpoints.down('xl')]: {
          marginLeft: theme.spacing(2),
        },
    }

})

class Landing extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme ={theme}>
                    <div>
                        <NavigationBar/>
                        
                        <Paper
                            className={classes.pageContainer}
                            square
                        >
                            <Typography 
                                className={classes.pageTitle}
                                variant="h3"
                                align="center"
                            >
                                Mateo's Movie Website
                            </Typography>
                            <Description
                            classes = {classes}
                            />

                            {/* <MovieProjectorModel/> */}

                        </Paper> 
                    </div>
                
            </MuiThemeProvider>
        )
        }
}

const Description = ({classes}) =>{
    return(
        <div>
            <Typography
            align="center"
            >
                This website is connected to a movie database, below are the descriptions of the each page on this site
            </Typography>
            <Container
                align="center"
            >
                <FormControl
                    className={classes.pageDescriptionsContainer}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        className={classes.pageDescriptions}
                    >
                        Review
                    </Typography>
                    <Typography
                        align="center"
                    >
                        Write movie reviews and ratings 
                    </Typography>
                </FormControl>
                <FormControl
                    className={classes.pageDescriptionsContainer}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        className={classes.pageDescriptions}
                    >
                        Search
                    </Typography>
                    <Typography
                        align="center"
                    >
                        Find movie info and reviews by using movie names, directors, and actors
                    </Typography>
                </FormControl>
                <FormControl
                    className={classes.pageDescriptionsContainer}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        className={classes.pageDescriptions}
                    >
                        Quiz
                    </Typography>
                    <Typography
                        align="center"
                    >
                        Play a movie quiz and try to guess the correct Director
                    </Typography>
                </FormControl>
            </Container>
        </div>
    )
}

export default withStyles(styles)(Landing);