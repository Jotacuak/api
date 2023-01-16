const EmailService = require("../../services/email-service");
const db = require("../../models");
const Contact = db.Contact;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    Contact.create(req.body).then(data => {

        let email = {
            subject: "Nuevo email de contacto",
            content: `Ha llegado un contacto nuevo a la web con la siguiente información:<br/>
                        <b>Nombre:</b> ${req.body.name}<br/>
                        <b>Apellidos:</b> ${req.body.surname}<br/>
                        <b>Teléfono:</b> ${req.body.telephone}<br/>
                        <b>Email:</b> ${req.body.email}<br/>
                        <b>Mensaje:</b> ${req.body.message}`
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

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Contact.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Contact.findByPk(id).then(data => {

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

    Contact.update(req.body, {
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

    Contact.destroy({
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