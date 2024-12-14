const express = require('express');
const cors = require('cors')
const multer = require('multer');
const bodyParser = require('body-parser')
const saveFile = require('./saveFile')
const path = require('path')

const app = express();
app.use(cors())

const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.raw({ type: 'application/*', limit: 1024 * 1024 * 5 }))

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.post('/upload', upload.array(), async (req, res, next) => {
    const fileName = await saveFile(req)
    res.json(JSON.stringify({ fileName }))
})

app.post('/hello', (req, res) => {
    res.send(JSON.stringify({ hello: "hello" }))
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});