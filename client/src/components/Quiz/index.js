import React, { Component} from 'react';
import Typography from "@material-ui/core/Typography";
import NavigationBar from '../NavigationBar';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../../Theme';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

})

class Search extends Component {
    constructor(props) {
      super(props);
    };

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
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Search);