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
    
    mainMessageContainer: {
        marginTop: "2vh",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          marginLeft: theme.spacing(4),
        }
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
        <Typography
            align="center"
            className={classes.mainMessageContainer}
        >
            This website provides information on a large range of movies,
        </Typography>
    )
}

export default withStyles(styles)(Landing);