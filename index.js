const express = require("express");
const http = require('http')
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path")
// creating app

const app = express();
const MONGO_URI = "mongodb://localhost:27017/CIT_DB";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true  })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


require("./middleware/passport.js")();
// Express Session
app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,"public")))

const web = require('./router/index')
app.use("/",web)

const api = require('./api/router')
app.use('/api',api)

http.createServer(app)
.listen(80)

