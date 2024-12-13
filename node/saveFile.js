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

function saveFile(req) {
    const buffer = req.body
    const fileType = req.headers['content-type'].split('/')[1]
    const fileName = `${randomName(10)}.${fileType}`
    const filePath = `${__dirname}/upload/${fileName}`
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('写入文件时发生错误:', err);
            return err
        }
        console.log('文件已被保存');
    });
    return fileName

}

module.exports = saveFile