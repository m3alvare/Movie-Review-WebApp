import React, { Component} from 'react';
import Typography from "@material-ui/core/Typography";
import NavigationBar from '../NavigationBar';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../../Theme';
import { Container, FormControl, FormGroup, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// const serverURL = "" //Dev mode
const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3066"; //enable for dev mode

const styles = theme => ({ 

    pageContainer: {
        marginTop: "0vh",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          marginLeft: theme.spacing(4),
        },
        minHeight: '91vh',
    },

    pageTitle: {
        marginTop: "0vh",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          marginLeft: theme.spacing(4),
        },
        padding: "2.5vh"
    },

    searchForm: {
        marginTop: "3vh",
    },

    SearchField: {
        marginTop: "0vh",
        marginLeft: theme.spacing(2),
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
                        Movie Search
                    </Typography>
                    <SearchForm
                        classes={classes}
                    />
                </Paper>
            </MuiThemeProvider>
        )
    }
}

const SearchForm = ({classes}) => {
    const [movieTitleSearchTerm, setMovieTitleSearchTerm] = React.useState('');
    const [actorSearchTerm, setActorSearchTerm] = React.useState('');
    const [directorSearchTerm, setDirectorSearchTerm] = React.useState('');
    const [movieData, setMovieData] = React.useState([{}]);

    const callApiSearch = async () => {
        
        const url = serverURL + '/api/search';

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
          },
          body: JSON.stringify({
            name: movieTitleSearchTerm,
            actor: actorSearchTerm,
            director: directorSearchTerm,
          })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const Search = ({}) =>{
        console.log("click has started search")
        callApiSearch()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setMovieData(parsed)
                console.log(parsed)
                console.log("Search Successful!")
      });
    }

    return(
        <div
            align="center"
        >
            <Container
                className = {classes.searchForm}
            >
                <SearchField
                    classes = {classes}
                    searchTerm = {movieTitleSearchTerm}
                    setSearchTerm = {setMovieTitleSearchTerm}
                    id = "Movie Title"
                />
                <SearchField
                    classes = {classes}
                    searchTerm = {actorSearchTerm}
                    setSearchTerm = {setActorSearchTerm}
                    id = "Director"
                />
                <SearchField
                    classes = {classes}
                    searchTerm = {directorSearchTerm}
                    setSearchTerm = {setDirectorSearchTerm}
                    id = "Actor"
                />
            </Container>
                    
            <br/>
            <Button 
                className = {classes.searchForm}
                variant="contained" 
                color="Primary"
                onClick={Search}
            >
                Search
            </Button>
            <br/>
            <Grid
            align = "center"
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ minHeight: '50vh' }}
          >
            {movieData.map(movieData =>(
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>
                   {movieData.movie} {" "}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" >
                    {movieData.director} {" "}
                  </Typography>
                  <Typography>
                    {movieData.Content} {" "}
                  </Typography>
                  <Typography variant="body2" component="p">
                   {movieData.avgScore} {" "}
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>            

           ))}
          </Grid>
        </div>
    )
}

const SearchField = ({classes, searchTerm, setSearchTerm, id}) => {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };
    return(
            <TextField 
                className= {classes.SearchField}
                id= {id} 
                label= {id} 
                variant="outlined" 
                value={searchTerm} 
                onChange={handleChange}
            />
    )
}

export default withStyles(styles)(Search);