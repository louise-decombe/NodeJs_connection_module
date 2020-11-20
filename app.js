
// constant I use in all the project
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();

//connection to the database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Route for the folder where the work is
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL bodies
app.use(express.urlencoded({ extended: false}));

//parse JSON Bodies -> value from the form is json
app.use(express.json());

// View made with handlebars
app.set('view engine', 'hbs');

// start connection and return error if error exists
db.connect( (error) => {
if(error){
    console.log(error)
}else{
    console.log("mysql connected !")
}
})


//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//Port 5000 is used to send and receive data
app.listen(5000,() => {
    console.log("server started on port 5000")
})