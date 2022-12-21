const db = require("../../models");
const PaybackDetail = db.PaybackDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    PaybackDetail.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.paybackId)
        whereStatement.paybackId = {[Op.substring]: req.query.paybackId};
        
    if(req.query.productId)
        whereStatement.productId = {[Op.substring]: req.query.productId};

    if(req.query.amount)
        whereStatement.amount = {[Op.substring]: req.query.amount};
        
    if(req.query.price)
        whereStatement.price = {[Op.substring]: req.query.price};

    if(req.query.measurementUnit)
        whereStatement.measurementUnit = {[Op.substring]: req.query.measurementUnit};
        
    if(req.query.productName)
        whereStatement.productName = {[Op.substring]: req.query.productName};
        
    if(req.query.ivaType)
        whereStatement.ivaType = {[Op.substring]: req.query.ivaType};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    PaybackDetail.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    PaybackDetail.findByPk(id).then(data => {

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

    PaybackDetail.update(req.body, {
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

    PaybackDetail.destroy({
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