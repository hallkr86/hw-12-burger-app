const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const connection = require("./config/connection");

var app = express();

var PORT = process.env.PORT || 8080;





// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// // Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.get("/", (req, res) => {
    connection.query("SELECT * FROM burger", (err, data) => {
        console.table(data);
    })
    res.render("index");
});


// app.get("/api/config", (req, res) => {
//     res.json({
//         success: true
//     });
// });



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
