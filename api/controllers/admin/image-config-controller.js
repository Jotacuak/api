const db = require("../../models");
const ImageConfig = db.ImageConfig;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.entity || !req.body.directory || !req.body.type || !req.body.content || !req.body.grid || !req.body.contentAccepted || !req.body.extensionConversion || !req.body.widthPx || !req.body.heighPx || !req.body.quality) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const imageConfig = {
        entity: req.body.entity,
        directory: req.body.directory,
        type: req.body.type,
        content: req.body.content,
        grid: req.body.grid,
        contentAccepted: req.body.contentAccepted,
        extensionConversion: req.body.extensionConversion,
        widthPx: req.body.widthPx,
        heighPx: req.body.heighPx,
        quality: req.body.quality
    };

    ImageConfig.create(imageConfig).then(data => {
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
        
    if(req.query.directory)
        whereStatement.directory = {[Op.substring]: req.query.directory};

    if(req.query.grid)
        whereStatement.grid = {[Op.substring]: req.query.grid};
        
    if(req.query.contentAccepted)
        whereStatement.contentAccepted = {[Op.substring]: req.query.contentAccepted};

    if(req.query.extensionConversion)
        whereStatement.extensionConversion = {[Op.substring]: req.query.extensionConversion};
        
    if(req.query.widthPx)
        whereStatement.widthPx = {[Op.substring]: req.query.widthPx};
        
    if(req.query.heightPx)
        whereStatement.heightPx = {[Op.substring]: req.query.heightPx};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    ImageConfig.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    ImageConfig.findByPk(id).then(data => {

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

    ImageConfig.update(req.body, {
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

    ImageConfig.destroy({
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