const fs = require('fs');
const { get } = require('http');
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const ImageOriginal = db.ImageOriginal;
const ImageConfiguration = db.ImageConfiguration;
const Image = db.Image;
const Op = db.Sequelize.Op;

module.exports = class ImageService {

    constructor(entity, entityId) {
        this.entity = entity;
        this.entityId = entityId;
    }

    uploadImage = images => {
        
        for (let key in images) {

            images[key].forEach(image => {

                if(image.fieldname.includes('[]')){
                    image.fieldname = image.fieldname.replace('[]', '');
                }
                
                let oldPath = path.join(__dirname, `../storage/tmp/${image.originalname}`);
                let newPath = path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`);    
                let newDir = path.dirname(newPath);

                fs.mkdir(newDir, { recursive: true }, (err) => {

                    if (err) throw err;

                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                    });

                    let imageOriginal = sharp(newPath)
                    .metadata()
                    .then(metadata => {

                        ImageOriginal.create({ 

                            path : `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`,
                            entity : this.entity,
                            entityId : this.entityId,
                            languageAlias : "es",
                            filename : image.originalname,
                            content : image.fieldname,
                            mimeType : image.mimetype,
                            sizeBytes : image.size,
                            widthPx : metadata.width,
                            heightPx : metadata.height

                        }).then( imageOriginal  => {

                            if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`))){
                                fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`));	
                            }
        
                            if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`))){
                                fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`));	
                            }
        
                            if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`))){
                                fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`));	
                            };

                            return imageOriginal.id
    
                        }).then (imageOriginalId => {

                            ImageConfiguration.findAll({
                                where: {
                                    entity: this.entity,
                                    content: image.fieldname
                                }
                                
                            }).then(settings => {

                                settings.forEach(setting => {
        
                                    sharp(newPath)
                                    .resize(setting.widthPx, setting.heightPx)
                                    .toFormat(setting.extensionConversion, {quality: setting.quality})
                                    .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${setting.content}/${setting.grid}/${path.parse(image.filename).name}.${setting.extensionConversion}`))
                                    .then(resizeData => {
                                    
                                        Image.create({
                                            imageConfigurationId : setting.id,
                                            imageOriginalId : imageOriginalId,
                                            title : "titulo",
                                            alt : "alt",
                                            path : `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${setting.grid}/${path.parse(image.filename).name}.${setting.extensionConversion}`,
                                            entity : this.entity,
                                            entityId: this.entityId,
                                            languageAlias : "es",
                                            filename: image.filename,
                                            content : setting.content,
                                            mimeType: `image/${setting.extensionConversion}`,
                                            grid : setting.grid,
                                            sizeBytes : resizeData.size,
                                            widthPx : resizeData.width,
                                            heightPx : resizeData.height,
                                            quality : setting.quality
                                        })
        
                                        console.log(`La imagen ${image.originalname} ha sido redimensionada`);

                                    }).catch((err) => {
                                        console.log(err);
                                    }); 
                                })                              
                            }).catch(err => {
                                console.log(err);    
                            }); 

                        }).catch(err => {
                            console.log(err);
                        });   

                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });
        };
    };
};