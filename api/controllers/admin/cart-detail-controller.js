const db = require("../../models");
const CartDetail = db.CartDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.cartId || !req.body.productId || !req.body.amount || !req.body.price || !req.body.measurementUnit || !req.body.productName || !req.body.taxType) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const cartDetail = {
        cartId: req.body.cartId,
        productId: req.body.productId,
        amount: req.body.amount,
        price: req.body.price,
        measurementUnit: req.body.measurementUnit,
        productName: req.body.productName,
        taxType: req.body.taxType
    };

    CartDetail.create(cartDetail).then(data => {
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
        
    if(req.query.taxType)
        whereStatement.taxType = {[Op.substring]: req.query.taxType};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    CartDetail.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    CartDetail.findByPk(id).then(data => {

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

    CartDetail.update(req.body, {
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

    CartDetail.destroy({
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