require('dotenv').config()
const cors = require('cors')

const express = require('express')

const app = express()

require('./app/database')

const routes = require('./routes')

app.use(cors())

app.use(express.json())

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes)

app.listen(3333)

