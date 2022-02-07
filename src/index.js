const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const app = express()
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use(bodyParser.json())

const swaggerFile = require('../openapi.json')

// Documentation
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerDocument)
})

// ReDoc
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/redoc.html'))
})

// SwaggerUi
app.use('/docs2', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(3000, () => {
  console.log('Server started at port 3000')
})



