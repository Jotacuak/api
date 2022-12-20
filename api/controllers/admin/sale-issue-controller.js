const db = require("../../models");
const SaleIssue = db.SaleIssue;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.payMethodId || !req.body.clientId || !req.body.cartId || !req.body.errorCode || !req.body.errorMessage) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const saleIssue = {
        payMethodId: req.body.payMethodId,
        clientId: req.body.clientId,
        cartId: req.body.cartId,
        errorCode: req.body.errorCode,
        errorMessage: req.body.errorMessage,
    };

    SaleIssue.create(saleIssue).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.payMethodId)
        whereStatement.payMethodId = {[Op.substring]: req.query.payMethodId};
        
    if(req.query.clientId)
        whereStatement.clientId = {[Op.substring]: req.query.clientId};

    if(req.query.cartId)
        whereStatement.cartId = {[Op.substring]: req.query.cartId};
        
    if(req.query.errorCode)
        whereStatement.errorCode = {[Op.substring]: req.query.errorCode};
        
    if(req.query.errorMessage)
        whereStatement.errorMessage = {[Op.substring]: req.query.errorMessage};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    SaleIssue.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    SaleIssue.findByPk(id).then(data => {

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

    SaleIssue.update(req.body, {
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

    SaleIssue.destroy({
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