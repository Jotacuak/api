const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`));	
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`));	
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`));	
                    }
                    
                    sharp(newPath)
                    .resize(200, 200)
                    .toFormat('webp')
                    .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail/${path.parse(image.filename).name}.webp`))
                    .then(() => {
                        console.log(`La imagen ${image.originalname} ha sido redimensionada`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
    }
}