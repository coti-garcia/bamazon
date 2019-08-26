const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const db = require("./models")

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// statis routes
app.use(express.static("public"));

//routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//SYNC
db.sequelize.sync().then( function(){
    app.listen(PORT, function(){
        console.log("Listening on PORT:" + PORT)
    })
});