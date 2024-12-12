const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

// app.all()
app.post('/upload', function (req, res) {
    res.send('ok')
})

app.listen(8080, () => {
    console.log('8080...')
})