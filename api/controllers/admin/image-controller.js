const db = require("../../models");
const Image = db.Image;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    Image.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.imageOriginalId)
        whereStatement.imageOriginalId = {[Op.substring]: req.query.imageOriginalId};
        
    if(req.query.imageConfigurationId)
        whereStatement.imageConfigurationId = {[Op.substring]: req.query.imageConfigurationId};

    if(req.query.title)
        whereStatement.title = {[Op.substring]: req.query.title};
        
    if(req.query.alt)
        whereStatement.alt = {[Op.substring]: req.query.alt};

    if(req.query.entity)
        whereStatement.entity = {[Op.substring]: req.query.entity};
        
    if(req.query.entityId)
        whereStatement.entityId = {[Op.substring]: req.query.entityId};
        
    if(req.query.languageAlias)
        whereStatement.languageAlias = {[Op.substring]: req.query.languageAlias};

    if(req.query.content)
        whereStatement.content = {[Op.substring]: req.query.content};

    if(req.query.mimeType)
        whereStatement.mimeType = {[Op.substring]: req.query.mimeType};
        
    if(req.query.grid)
        whereStatement.grid = {[Op.substring]: req.query.grid};
        
    if(req.query.sizeBytes)
        whereStatement.sizeBytes = {[Op.substring]: req.query.sizeBytes};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Image.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Image.findByPk(id).then(data => {

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

    Image.update(req.body, {
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

    Image.destroy({
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