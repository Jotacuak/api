const db = require("../../models");
const SaleDetail = db.SaleDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.saleId || !req.body.productId || !req.body.amount || !req.body.price || !req.body.measurementUnit || !req.body.productName || !req.body.ivaType) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const saleDetail = {
        saleId: req.body.saleId,
        productId: req.body.productId,
        amount: req.body.amount,
        price: req.body.price,
        measurementUnit: req.body.measurementUnit,
        productName: req.body.productName,
        ivaType: req.body.ivaType,
    };

    SaleDetail.create(saleDetail).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.saleId)
        whereStatement.saleId = {[Op.substring]: req.query.saleId};
        
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

    SaleDetail.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    SaleDetail.findByPk(id).then(data => {

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

    SaleDetail.update(req.body, {
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

    SaleDetail.destroy({
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