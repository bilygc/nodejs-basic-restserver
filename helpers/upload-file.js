import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFiles = (files, folder = '', validExtensions = ['jpg', 'bmp', 'png', 'jpeg', 'gif', 'svg', 'tiff'] ) =>{
    return new Promise((resolve, reject) =>{

        const aux = files.name.split('.')
        const extension = aux[aux.length - 1];

        if(!validExtensions.includes(extension)){
            return reject(`The extension : ${ extension } is not a valid extension, valid extensions: ${ validExtensions }`)
        }

        const tempName = uuidv4() + '.' + extension;
    
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
    
        files.mv(uploadPath, function(err) {
            if (err) {
                console.error(err);
                return reject(`Error trying to upload the file: ${err}`);
            }
        
            resolve(tempName)
        });
    });
}