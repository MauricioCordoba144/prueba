
/*
db.createUser( { user: "ejemplo",
pwd: "prueba",
roles: [ { role: "dbOwner", db: "ejemploprueba" } ] 
});
*/

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { requireAuth } = require("./middleware/authMiddleWare");

var corsOptions = {
    origin: "https://clever-nightingale-343e9f.netlify.app", //Se cambia en Heroku "http://localhost:3000"
    //SameSite: None,
    optionsSuccessStatus: 200,
    credentials: true,
};

const app = express();
const port = (process.env.DB_PORT||3000);

mongoose
    .connect(
        "mongodb+srv://Admin:Admin@cluster0.ipude.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Connected to Mongo at: " + process.env.DB_HOST);
        app.listen(process.env.PORT);
        console.log("Listening on PORT: " + process.env.PORT)
    })
    .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", requireAuth, apiRoutes);
app.use("/auth",authRoutes);






