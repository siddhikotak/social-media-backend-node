const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());

// Require routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//Routes Middleware
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "Unauthorized error" });
    }
});



mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error:${err.message}`);
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);

});
