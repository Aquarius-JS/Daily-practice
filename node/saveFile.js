const fs = require('fs')

const randomName = function (length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let charactersLength = chars.length
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function saveFile(req) {
    const buffer = req.body
    const fileType = req.headers['content-type'].split('/')[1]
    const fileName = `${randomName(10)}.${fileType}`
    const filePath = `${__dirname}/upload/${fileName}`
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                reject(err)
            }
            resolve(fileName)
        });
    })
}

module.exports = saveFile