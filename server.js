let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.get('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT id, name, year, quality FROM movies`;
	
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);

	let movieID = req.body.movieID;
	let userID = req.body.userID;
	let reviewTitle = req.body.reviewTitle;
	let reviewContent = req.body.reviewContent;
	let reviewScore = req.body.reviewScore;

	let sql = `INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
	console.log(sql);
	let data = [movieID, userID, reviewTitle, reviewContent, reviewScore];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/search', (req, res) => {

	let connection = mysql.createConnection(config);

	let name = req.body.name + "%";
	let actor = "%" + req.body.actor + "%";
	let director = "%" + req.body.director + "%" ;


	let sql = `SELECT Searched.movie, Searched.director, Reviews.avgScore, Reviews.Content
				FROM (SELECT DISTINCT Mname.name as movie, Mname.id, Dname.director_name as director
					FROM (SELECT MD.movie_id, concat(D.first_name, ' ', D.last_name) as director_name FROM movies_directors AS MD, directors AS D WHERE concat(D.first_name, ' ', D.last_name) LIKE (?) AND MD.director_id=D.id) AS Dname,
						(SELECT movie_id FROM roles, actors WHERE CONCAT(actors.first_name, ' ' , actors.last_name) LIKE (?) AND roles.actor_id=actors.id) AS Aname,
						(SELECT name, id FROM movies WHERE name LIKE (?)) AS Mname
					WHERE Mname.id = Dname.movie_id And Mname.id = Aname.movie_id AND Dname.movie_id = Aname.movie_id
					ORDER BY Mname.id) AS Searched
				LEFT JOIN (SELECT movieID, AVG(reviewScore) AS avgScore, group_concat(reviewContent, ', ') AS Content FROM Review Group BY movieID) AS Reviews
				ON Searched.id = Reviews.movieID;`;

	let data = [actor, director, name];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})

app.get('/api/randMovie', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT m.name, d.first_name, d.last_name
				FROM movies_directors md, movies m, directors d
				WHERE md.movie_id = m.id AND md.director_id = d.id
				ORDER BY RAND()
				LIMIT 1;`;
	
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.listen(port, '172.31.31.77'); //for AWS SERVER 

// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
