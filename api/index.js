const express = require("express");
const cors = require("cors");
const fs = require('fs'); 
const app = express();
const db = require("./models");
const multer = require("multer");

var corsOptions = {
    origin: ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501']
};

app.use(cors(corsOptions));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(express.json({limit: "10mb", extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/tmp/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

var routePath="./routes/";

fs.readdirSync(routePath).forEach(function(file) {
    require(routePath + file)(app, upload);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});
