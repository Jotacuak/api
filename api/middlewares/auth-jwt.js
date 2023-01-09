const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const process = require('process');
const db = require("../models");

verifyUserToken = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: "No se ha entregado el token."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).send({
                message: "No tiene permiso."
            });
        }

        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyUserToken: verifyUserToken,
};

module.exports = authJwt;