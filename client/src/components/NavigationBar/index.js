import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../../Theme';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'


export default function ButtonAppBar() {
  return (
    <MuiThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
            position="static"
            color='primary'
            >
                <Toolbar>
                    <Link to = {ROUTES.LANDING} style={{textDecoration: 'none'}}>
                        <Button>Landing</Button>
                    </Link>
                    <Link to = {ROUTES.REVIEW} style={{textDecoration: 'none'}}>
                        <Button>Review</Button>
                    </Link>
                    <Link to = {ROUTES.SEARCH} style={{textDecoration: 'none'}}>
                        <Button>Search</Button>
                    </Link>
                    <Link to = {ROUTES.QUIZ} style={{textDecoration: 'none'}}>
                        <Button>Quiz</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    </MuiThemeProvider>
  );
}
