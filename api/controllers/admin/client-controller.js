const db = require("../../models");
const Client = db.Client;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.name || !req.body.surname || !req.body.telephone || !req.body.email || !req.body.township || !req.body.postalCode || !req.body.address) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const client = {
        name: req.body.name,
        surname: req.body.surname,
        telephone: req.body.telephone,
        email: req.body.email,
        township: req.body.township,
        postalCode: req.body.postalCode,
        address: req.body.address
    };

    Client.create(client).then(data => {
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