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

                    sharp(newPath)
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
                        })

                        .catch(err => {
                            console.log(err);
                        });
                    });

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`));	
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`));	
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`));	
                    }
                

                    // Previo a realizar el redimensionamiento de imagenes hay que consultar en image
                    // configurations todas las redimensiones que hay que hacer para la entity e image.fieldname (content) dados

                    // ImageConfiguration.findAll({
                    //     where: {
                    //         entity: this.entity,
                    //         content: image.fieldname
                    //     }
                    // });
                    
                    // sharp(newPath)
                    // .resize(200, 200)
                    // .toFormat('webp')
                    // .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail/${path.parse(image.filename).name}.webp`))
                    // .then(() => {

                    //     Registrar en image resize 
                    //     ImageResize.create({
                    //         imageConfigurationId : ,
                    //         imageOriginalId : ,
                    //         title : ,
                    //         alt : ,
                    //         path : ,
                    //         entity : this.entity,
                    //         entityId: this.entityId,
                    //         languageAlias : "es",
                    //         filename: image.filename,
                    //         content : image.fieldname,
                    //         mimeType: image.mimetype,
                    //         grid : "200x200",
                    //         sizeBytes : ,
                    //         widthPx : 200,
                    //         height : 200,
                    //         quality
                    //     })

                    //     console.log(`La imagen ${image.originalname} ha sido redimensionada`);
                    // })
                    // .catch((err) => {
                    //     console.log(err);
                    // });
                });
            });
        }
    }
}