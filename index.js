require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json({ }))
app.use(cors())

require('./src/routes')(app)


app.listen(port, () => console.log(`listen http server - http://localhost:${port}`))
