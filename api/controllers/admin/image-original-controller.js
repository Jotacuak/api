const db = require("../../models");
const ImageOriginal = db.ImageOriginal;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.path || !req.body.entity || !req.body.entityId || !req.body.languageAlias || !req.body.filename || !req.body.content || !req.body.mimeType || !req.body.sizeBytes || !req.body.widthPx || !req.body.heighPx) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const imageOriginal = {
        path: req.body.path,
        entity: req.body.entity,
        entityId: req.body.entityId,
        languageAlias: req.body.languageAlias,
        filename: req.body.filename,
        content: req.body.content,
        mimeType: req.body.mimeType,
        sizeBytes: req.body.sizeBytes,
        widthPx: req.body.widthPx,
        heighPx: req.body.heighPx
    }

    ImageOriginal.create(imageOriginal).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.entity)
        whereStatement.entity = {[Op.substring]: req.query.entity};
        
    if(req.query.entityId)
        whereStatement.entityId = {[Op.substring]: req.query.entityId};

    if(req.query.languageAlias)
        whereStatement.languageAlias = {[Op.substring]: req.query.languageAlias};
        
    if(req.query.filename)
        whereStatement.filename = {[Op.substring]: req.query.filename};

    if(req.query.content)
        whereStatement.content = {[Op.substring]: req.query.content};
        
    if(req.query.mimeType)
        whereStatement.mimeType = {[Op.substring]: req.query.mimeType};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    ImageOriginal.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    ImageOriginal.findByPk(id).then(data => {

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

    ImageOriginal.update(req.body, {
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

    ImageOriginal.destroy({
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