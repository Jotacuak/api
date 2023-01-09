const db = require("../../models");
const CompanyDetail = db.CompanyDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    CompanyDetail.create(req.body).then(data => {
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
        
    if(req.query.phoneNumber)
        whereStatement.phoneNumber = {[Op.substring]: req.query.phoneNumber};

    if(req.query.mobileNumber)
        whereStatement.mobileNumber = {[Op.substring]: req.query.mobileNumber};
        
    if(req.query.cifNumber)
        whereStatement.cifNumber = {[Op.substring]: req.query.cifNumber};

    if(req.query.openingDays)
        whereStatement.openingDays = {[Op.substring]: req.query.openingDays};
        
    if(req.query.customerServiceHours)
        whereStatement.customerServiceHours = {[Op.substring]: req.query.customerServiceHours};

    if(req.query.visible)
        whereStatement.visible = {[Op.substring]: req.query.visible};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    CompanyDetail.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    CompanyDetail.findByPk(id).then(data => {

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

    CompanyDetail.update(req.body, {
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

    CompanyDetail.destroy({
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