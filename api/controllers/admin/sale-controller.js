const db = require("../../models");
const Sale = db.Sale;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    Sale.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.cartId)
        whereStatement.cartId = {[Op.substring]: req.query.cartId};
        
    if(req.query.clientId)
        whereStatement.clientId = {[Op.substring]: req.query.clientId};
        
    if(req.query.payMethodId)
    whereStatement.payMethodId = {[Op.substring]: req.query.payMethodId};
    
    if(req.query.reference)
    whereStatement.reference = {[Op.substring]: req.query.reference};
    
    if(req.query.totalPrice)
        whereStatement.totalPrice = {[Op.substring]: req.query.totalPrice};
        
    if(req.query.totalBasePrice)
        whereStatement.totalBasePrice = {[Op.substring]: req.query.totalBasePrice};
        
    if(req.query.totalIvaPrice)
    whereStatement.totalIvaPrice = {[Op.substring]: req.query.totalIvaPrice};
    
    if(req.query.broadcastDate)
    whereStatement.broadcastDate = {[Op.substring]: req.query.broadcastDate};
        
    if(req.query.broadcastHour)
        whereStatement.broadcastHour = {[Op.substring]: req.query.broadcastHour};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Sale.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Sale.findByPk(id).then(data => {

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

    Sale.update(req.body, {
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

    Sale.destroy({
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