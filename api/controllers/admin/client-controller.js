const EmailService = require("../../services/email-service");
const db = require("../../models");
const Client = db.Client;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    Client.create(req.body).then(data => {

        let email = {
            subject: "Nuevo email de chekout",
            content: `Ha llegado un contacto nuevo a la web con la siguiente información:<br/>
                        <b>Nombre:</b> ${req.body.name}<br/>
                        <b>Teléfono:</b> ${req.body.telephone}<br/>
                        <b>Email:</b> ${req.body.email}<br/>
                        <b>Poblacion:</b> ${req.body.township}<br/>
                        <b>Codigo Postal:</b> ${req.body.postalCode}<br/>
                        <b>Dirección:</b> ${req.body.address}`
        };
        
        new EmailService('gmail').sendEmail(email);

        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.name)
        whereStatement.name = {[Op.substring]: req.query.name};
        
    if(req.query.surname)
        whereStatement.surname = {[Op.substring]: req.query.surname};
    
    if(req.query.telephone)
        whereStatement.telephone = {[Op.substring]: req.query.telephone};
    
    if(req.query.email)
        whereStatement.email = {[Op.substring]: req.query.email};
        
    if(req.query.township)
        whereStatement.township = {[Op.substring]: req.query.township};
    
    if(req.query.postalCode)
        whereStatement.postalCode = {[Op.substring]: req.query.postalCode};

    if(req.query.address)
        whereStatement.address = {[Op.substring]: req.query.address};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Client.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Client.findByPk(id).then(data => {

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `No se puede encontrar el elemento con la id=${id}.`
            });
        }

    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al recuperar la id=" + id
        });
    });
};

exports.update = (req, res) => {

    const id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
            });
        } else {
            res.status(404).send({
                message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al actualiazar la id=" + id
        });
    });
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Client.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido borrado correctamente"
            });
        } else {
            res.status(404).send({
                message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al borrar la id=" + id
        });
    });
};