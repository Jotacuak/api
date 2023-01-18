const fs = require('fs');
const { get } = require('http');
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const ImageOriginal = db.ImageOriginal;
const ImageConfiguration = db.ImageConfiguration;
const ImageResize = db.ImageResize;
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
                                
                            }).then(datas => {

                                datas.forEach(data => {
        
                                    sharp(newPath)
                                    .resize(data.widthPx, data.heightPx)
                                    .toFormat(data.extensionConversion, {quality: data.quality})
                                    .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${data.content}/${data.grid}/${path.parse(image.filename).name}.${data.extensionConversion}`))
                                    .then(resizeData => {
                                    
                                        ImageResize.create({
                                            imageConfigurationId : data.id,
                                            imageOriginalId : imageOriginalId,
                                            title : "titulo",
                                            alt : "alt",
                                            path : `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${data.grid}/${path.parse(image.filename).name}.${data.extensionConversion}`,
                                            entity : this.entity,
                                            entityId: this.entityId,
                                            languageAlias : "es",
                                            filename: image.filename,
                                            content : data.content,
                                            mimeType: `image/${data.extensionConversion}`,
                                            grid : data.grid,
                                            sizeBytes : resizeData.size,
                                            widthPx : resizeData.width,
                                            heightPx : resizeData.height,
                                            quality : data.quality
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