A Web ping system build:

Frontend - React

Backend - Node JS (Express.js) 

Database - MySQL (for top 5)

This project was build in the Backend with Node JS (Express.js)

Api used for project: https://github.com/danielzzz/node-ping
  
Web-app that allow the user to run the ping system command on the web server via a web form.
The user of the app able to configure the ping command from the GUI. Count the number of sending/receiving packets, and having the top 5 most sreached host from the DB.

For working with MYSQL you should put your DB user in the creatConeection section:

const db = mysql.createConnection({
  // conection to mysql
  host: "localhost",
  
  user: "your user",
  
  password: "your password",
  
  database: "the name of DB you want",
  
});
