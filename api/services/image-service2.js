const fs = require('fs');
const rimraf = require("rimraf");
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const ImageConfiguration = db.ImageConfiguration;
const Image = db.Image;

module.exports = class ImageService {

    constructor(entity, entityId) {
        this.entity = entity;
        this.entityId = entityId;
    }

    uploadImage = async images => {

        for (let key in images) {

            for(let image of images[key]) {

                try{

                    if(image.fieldname.includes('[]')){
                        image.fieldname = image.fieldname.replace('[]', '');
                    }

                    if(image.originalname.includes(' ')){
                        image.originalname = image.originalname.replace(' ', '_');
                    }
                    
                    let oldPath = path.join(__dirname, `../storage/tmp/${image.originalname}`);
                    let newPath = path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`);    
                    let newDir = path.dirname(newPath);

                    if(fs.existsSync(newDir)){

                        rimraf.sync(newDir);

                        // await sustituye los "then" de las promesas.

                        await ImageOriginal.destroy({
                            where: {
                                entity: this.entity,
                                entityId: this.entityId,
                                content: image.fieldname
                            }
                        });
                    }

                    // De manera recursiva está creando las carpetas. Para realizar el callback
                    //  también es necesario el async ya que es ejecutado como una función.
    
                    await fs.mkdir(newDir, { recursive: true }, async err => {
    
                        if (err) throw err;
    
                        await fs.rename(oldPath, newPath, async err => {
                            if (err) throw err;

                            let metadata =  await sharp(newPath).metadata();
        
                            const imageOriginal = await ImageOriginal.create({
                                path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`,
                                entity: this.entity,
                                entityId: this.entityId,
                                languageAlias: 'es',
                                filename: image.originalname,
                                content: image.fieldname,
                                mimeType: image.mimetype,
                                sizeBytes: image.size,
                                widthPx: metadata.width,
                                heightPx: metadata.height
                            });
                            
                            const imageConfigurations =  await ImageConfiguration.findAll({
                                where: {
                                    entity: this.entity,
                                    content: image.fieldname
                                }
                            });

            
                            for (let imageConfiguration of imageConfigurations) {

                                if (fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}`))){
                                    
                                    rimraf.sync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}`));

                                    await Image.destroy({
                                        where: {
                                            imageConfigurationId: imageConfiguration.id,
                                            entity: this.entity,
                                            entityId: this.entityId
                                        }
                                    });

                                    fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}`));	

                                }else{
                                    fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}`));	
                                }    

                                const image = await sharp(newPath)
                                    .resize(imageConfiguration.widthPx, imageConfiguration.heightPx)
                                    .toFormat(imageConfiguration.extensionConversion, { quality: imageConfiguration.quality })
                                    .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}/${path.parse(image.filename).name}.${imageConfiguration.extensionConversion}`));
            
                                await Image.create({
                                    imageConfigurationId: imageConfiguration.id,
                                    imageOriginalId: imageOriginal.id,
                                    title: "prueba",
                                    alt: "prueba",
                                    path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${imageConfiguration.grid}/${path.parse(image.filename).name}.${imageConfiguration.extensionConversion}`,
                                    entity: this.entity,
                                    entityId: this.entityId,
                                    languageAlias: 'es',
                                    filename: image.originalname,
                                    content: image.fieldname,
                                    mimeType: `image/${image.format}`,
                                    grid: imageConfiguration.grid,
                                    sizeBytes: image.size,
                                    widthPx: imageConfiguration.widthPx,
                                    heightPx: imageConfiguration.heightPx,
                                    quality: imageConfiguration.quality
                                });     
                            } 
                        });
        
                    }); 
                } catch (error) {
                    console.log(error);
                }    
            }
        }
    }

    getImages = async () => {

        const images = await Image.findAll({
            where: {
                entity: this.entity,
                entityId: this.entityId
            }
        });

        return images;
    }

    deleteImages = async () => {
            
        await ImageOriginal.destroy({
            where: {
                entity: this.entity,
                entityId: this.entityId
            }
        });

        await Image.destroy({
            where: {
                entity: this.entity,
                entityId: this.entityId
            }
        });

        const directory = path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}`);

        if (fs.existsSync(directory)) {
            rimraf.sync(directory);
        }
    }
}