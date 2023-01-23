const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const ImageConfiguration = db.ImageConfiguration;
const Image = db.Image;

module.exports = class ImageService {

    uploadImage = async images => {

        let result = [];

        for (let key in images) {

            for(let image of images[key]) {

                try{

                    if(image.originalname.includes(' ')){
                        image.filename = image.originalname.replace(' ', '-');
                    }
                    
                    let oldPath = path.join(__dirname, `../storage/tmp/${image.originalname}`);

                    let filename = await fs.access(path.join(__dirname, `../storage/images/gallery/original/${path.parse(image.filename).name}.webp`)).then(async () => {
                        return `${path.parse(image.filename).name}-${new Date().getTime()}.webp`;
                    }).catch(async () => {
                        return `${path.parse(image.filename).name}.webp`;
                    });
                        
                    await sharp(oldPath)
                    .webp({ lossless: true })
                    .toFile(path.join(__dirname, `../storage/images/gallery/original/${filename}`));

                    await sharp(oldPath)
                    .resize(135,135)
                    .webp({ lossless: true })
                    .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${filename}`));

                    await fs.unlink(oldPath);

                    result.push(filename);

                } catch (error) {
                    console.log(error);
                }    
            }
        }

        return result;
    }

    resizeImages = async (entity, entityId, images) => {

        try{

            for (let key in images) {

                if (key.startsWith('images')) {
    
                    let keySplit = key.split('-');
                    let name = keySplit[1];
                    let languageAlias = keySplit[2];
                    let originalFilenames = images[key].split(',');
    
                    const imageConfigurations =  await ImageConfiguration.findAll({
                        where: {
                            entity: entity,
                            name: name
                        }
                    });
    
                    for (let imageConfiguration of imageConfigurations) {

                        for (let originalFilename of originalFilenames) {
        
                            let imageResize = {};
        
                            await fs.access(path.join(__dirname, `../storage/images/resized/${originalFilename}-${imageConfiguration.widthPx}x${imageConfiguration.heightPx}.webp`)).then(async () => {
        
                                let start = new Date().getTime();
        
                                let stats = await fs.stat(path.join(__dirname, `../storage/images/resized/${originalFilename}-${imageConfiguration.widthPx}x${imageConfiguration.heightPx}.webp`));
                                imageResize = await sharp(path.join(__dirname, `../storage/images/resized/${originalFilename}-${imageConfiguration.widthPx}x${imageConfiguration.heightPx}.webp`)).metadata();
                                imageResize.size = stats.size;
        
                                let end = new Date().getTime();
        
                                imageResize.latency = end - start;                        
        
                            }).catch(async () => {
        
                                let start = new Date().getTime();
                                
                                imageResize = await sharp(path.join(__dirname, `../storage/images/gallery/original/${originalFilename}`))
                                .resize(imageConfiguration.widthPx, imageConfiguration.heightPx)
                                .webp({ nearLossless: true })
                                .toFile(path.join(__dirname, `../storage/images/resized/${originalFilename}-${imageConfiguration.widthPx}x${imageConfiguration.heightPx}.webp`));
                                
                                let end = new Date().getTime();
        
                                imageResize.latency = end - start;                        
                            });
        
                            await Image.create({
                                imageConfigurationId: imageConfiguration.id,
                                entityId: entityId,
                                entity: entity,
                                name: name,
                                originalFilename: originalFilename,
                                resizedFilename: `${originalFilename}-${imageConfiguration.widthPx}x${imageConfiguration.heightPx}.webp`,
                                title: "prueba",
                                alt: "prueba",
                                languageAlias: languageAlias,
                                mediaQuery: imageConfiguration.mediaQuery,
                                sizeBytes: imageResize.size,
                                latency: imageResize.latency,
                            });     
                        }
                    }
                }
            }

            return true;

        }catch(error){

            console.log(error);

            return false;
        }
    }

    deleteImages = async filename => {

        try{
            await fs.unlink(path.join(__dirname, `../storage/images/gallery/original/${filename}`));
            await fs.unlink(path.join(__dirname, `../storage/images/gallery/thumbnail/${filename}`));
            
            return 1;

        }catch{
            return 0;
        }
    }

    getThumbnails = async (limit, offset) => {

        let images = {};
        let files = await fs.readdir(path.join(__dirname, `../storage/images/gallery/thumbnail`));

        images.filenames = await fs.readdir(path.join(__dirname, `../storage/images/gallery/thumbnail`), { limit: limit, offset: offset});
        images.count = files.length;
    
        return images;
    }

    getImages = async (entity, entityId) => {

        const images = await Image.findAll({
            where: {
                entity: entity,
                entityId: entityId
            }
        });

        return images;
    }
}